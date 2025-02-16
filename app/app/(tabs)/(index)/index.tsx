import { isWebSafari } from "@/helper/iswebsafari";
import { useRouter, useSegments } from "expo-router";
import Head from "expo-router/head";
import { useState } from "react";
import { Platform, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";

import { NewsHeaderLeftItem } from "@/components/NewsHeaderLeftItem";
import { NewsItem, NewsItemType } from "@/components/NewsItem";
import { SwipeableNewsItem } from "@/components/SwipeableNewsItem";
import { TabMenu } from "@/components/TabMenu";
import { WelcomeModal } from "@/components/WelcomeModal";
import { news } from "@/data/news.json";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface Source {
  id: string;
  name: string;
  logo_transparent_light: string;
  logo_transparent_dark: string;
}

interface Topic {
  id: string;
  name: string;
}

interface Author {
  name: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: Source;
  created_at: string;
  topic: Topic;
  show_topic: boolean;
  author: Author;
  featured_image: string;
  card_type: "full" | "medium";
}

const TABS = [
  { id: "newspaper", label: "Newspaper", icon: "newspaper" },
  { id: "dining", label: "Dining", icon: "restaurant-outline" },
  { id: "catalog", label: "Directory", icon: "list" },
];

export default function NewsPlusScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const currentGroup = segments[1];
  const iconColor = "#fff";
  const insets = useSafeAreaInsets();

  const AnimatedSwipeListView = Animated.createAnimatedComponent(SwipeListView);
  const [activeTab, setActiveTab] = useState("newspaper");

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderNewsItem = (data: { item: NewsItemType }) => (
    <NewsItem item={data.item} />
  );

  const renderHiddenItem = (
    data: { item: NewsItemType },
    rowMap: RowMap<NewsItemType>
  ) => <SwipeableNewsItem item={data.item} />;

  const renderContent = () => {
    switch (activeTab) {
      case "newspaper":
        return (
          <AnimatedSwipeListView
            scrollEventThrottle={16}
            data={news as NewsItemType[]}
            renderItem={renderNewsItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={120}
            rightOpenValue={-120}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            bounces={false}
            keyExtractor={(item: any) => item.id}
            style={
              Platform.OS === "web"
                ? {
                    height: undefined,
                    overflow: "visible",
                  }
                : undefined
            }
            scrollEnabled={Platform.OS !== "web" || isWebSafari()}
            contentContainerStyle={{
              // paddingTop: insets.top,
              paddingBottom: insets.bottom + 60,
              backgroundColor: Platform.OS !== "web" ? "#F2F2F7" : "white",
              ...(Platform.OS === "web"
                ? {
                    height: undefined,
                  }
                : {}),
            }}
            ListHeaderComponent={
              <View className="space-y-4">
                <View className="flex-row items-center justify-between px-5">
                  <NewsHeaderLeftItem size="md" secondaryTitle="Home" />
                </View>

                <TabMenu
                  tabs={TABS}
                  activeTab={activeTab}
                  onTabPress={handleTabPress}
                />

                <View className="py-6 px-5">
                  <Text className="text-2xl font-extrabold text-black">
                    Stories For You
                  </Text>
                  <Text className="text-md text-gray-500">
                    Read the most recent stories from The California Tech.
                  </Text>
                </View>
              </View>
            }
          />
        );
      case "magazines":
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-gray-600">My Magazines Content</Text>
          </View>
        );
      case "downloaded":
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-gray-600">Downloaded Content</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Platform.OS !== "android" && <WelcomeModal />}
      {Platform.OS === "web" && (
        <Head>
          <meta
            name="description"
            content="Stay updated with the latest news, trending stories, and personalized content from trusted sources."
          />
          <meta
            name="keywords"
            content="apple news, news app, latest news, trending stories"
          />

          <meta property="og:title" content="Olive Walk - Find News & Topics" />
          <meta
            property="og:description"
            content="Search through millions of articles, topics, and trusted sources to find the news that matters to you."
          />
          <meta property="og:image" content="../assets/images/featured.png" />
          <meta property="og:url" content="https://apple-news.expo.app/audio" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Olive Walk - Find News & Topics"
          />
          <meta
            name="twitter:description"
            content="Search through millions of articles, topics, and trusted sources to find the news that matters to you."
          />
          <meta name="twitter:image" content="../assets/images/featured.png" />
        </Head>
      )}
      <SafeAreaView className="flex-1">{renderContent()}</SafeAreaView>
    </>
  );
}
