import requests
import os
from bs4 import BeautifulSoup, SoupStrainer
import json
import time
import lxml
import cchardet
import re

if not os.path.exists("coursedata"):
    os.makedirs("coursedata")

start_time = time.time()


def cleanup_name(name):
    name = name.strip()

    if name.find("Analytical") != -1:
        return (
            cleanup_name(name[: name.find("Analytical")].strip()) + " " + "Analytical"
        )

    if name.find("Practical") != -1:
        return cleanup_name(name[: name.find("Practical")].strip()) + " " + "Practical"

    if name.find("Section") != -1:
        section_number = name[name.find("Section") :].strip()
        if section_number.find(" ") == -1:
            section_number = "Section " + section_number[7:].strip()
        return cleanup_name(name[: name.find("Section")].strip()) + " " + section_number

    suffix = ""

    while not str.isdigit(name[-1]):
        suffix += name[-1]
        name = name[:-1]

    suffix = suffix[::-1].strip()

    if len(suffix) > 0:
        suffix = " " + suffix

    i = len(name) - 1

    while i >= 0 and not str.isdigit(name[i]):
        i -= 1

    while i + 2 < len(name) and name[i + 1] == " ":
        name = name[: i + 1] + name[i + 2 :]

    while i >= 0 and str.isdigit(name[i]):
        i -= 1

    while i + 2 < len(name) and name[i + 1] == "0":
        name = name[: i + 1] + name[i + 2 :]

    return name[: i + 1].strip() + " " + name[i + 1 :].strip().lower() + suffix.lower()


base_url = "https://catalog.caltech.edu"
years_and_urls = [
    "/current/2024-25",
    "/archive/2023-24",
    "/archive/2022-23",
    "/archive/2021-22",
    "/archive/2020-21",
    "/archive/2019-20",
    "/archive/2018-19",
    "/archive/2017-18",
    "/archive/2016-17",
    "/archive/2015-16",
    "/archive/2014-15",
    "/archive/2013-14",
    "/archive/2012-13",
]

for year in years_and_urls:
    if os.path.exists(f"coursedata/{year[-7:]}.json"):
        continue

    s = requests.get(base_url + year)

    strainer = SoupStrainer("a")
    soup = BeautifulSoup(s.text, "lxml", parse_only=strainer)
    courses = []

    print(year)

    for a in soup.find_all("a"):
        if a.has_attr("href") and a["href"].startswith(year + "/department/"):
            url = base_url + a["href"]
            print(url)
            data = requests.get(url)
            # strainer2 = SoupStrainer('div', {'class': 'course-description2'})
            strainer2 = SoupStrainer("div")
            soup2 = BeautifulSoup(data.text, "lxml", parse_only=strainer2)
            for div in soup2.find_all("div"):
                if div.has_attr("class") and "course-description2" in div["class"]:
                    course = {
                        "id": "",
                        "title": "",
                        "description": "",
                        "units": "",
                        "terms_offered": "",
                        "prerequisites": "",
                        "instructors": [],
                    }
                    if "course-description2--not-offered" in div["class"]:
                        course["instructors"] = ["Not offered"]
                    for element in div.find_all("div"):
                        if "course-description2__label" in element["class"]:
                            course["id"] = cleanup_name(element.text.strip())
                            # print("ID:", course['id'])
                        elif "course-description2__units-and-terms" in element["class"]:
                            course["units"], course["terms_offered"] = [
                                subelement.text.strip()
                                for subelement in element.find_all()
                            ]
                            # print("Units:", course['units'])
                            # rint("Terms offered:", course['terms_offered'])
                        elif "course-description2__prerequisites" in element["class"]:
                            course["prerequisites"] = element.text.strip()[15:]
                            # print("Prerequisites:", course['prerequisites'])
                        elif "course-description2__description" in element["class"]:
                            # course['description'] = ' '.join([re.sub('\s+', ' ', text.strip()) for text in element.stripped_strings])
                            course["description"] = " ".join(
                                [text.strip() for text in element.stripped_strings]
                            )
                            # print("Description:", course['description'])
                        elif "course-description2__instructors" in element["class"]:
                            course["instructors"] = [
                                instructor.strip().replace(",", "")
                                for instructor in element.text.split()[1:]
                            ]
                            # print("Instructors:", course['instructors'])
                    for element in div.find_all("h3"):
                        if "course-description2__title" in element["class"]:
                            course["title"] = element.text.strip()
                            # print("Title:", course['title'])
                    courses.append(course)

    with open(f"coursedata/{year[-7:]}.json", "w") as f:
        json.dump(courses, f, indent=4)

print(f"All data scraped in {time.time() - start_time}s!")
