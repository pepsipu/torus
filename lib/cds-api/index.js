import { GoogleSpreadsheet } from 'google-spreadsheet';

// this is a public spreadsheet!
export const SPREADSHEET_ID = '1xZWXd0J-6D3dclTkZSGBs4--kXtRSZQOuSsm9ZSPodg';

export async function fetchMenu(spreadsheetId, apiKey) {
    const doc = new GoogleSpreadsheet(spreadsheetId, { apiKey });
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('A1:F39');

    const dayMapping = {
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday'
    };

    const menu = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    };

    for (let row = 0; row < 39; row += 3) {
        const keyCell = sheet.getCell(row, 0);
        const key = keyCell.value;

        for (let col = 1; col <= 5; col++) {
            const dishCell = sheet.getCell(row, col);
            const allergensCell = sheet.getCell(row + 1, col);
            const dietaryCell = sheet.getCell(row + 2, col);

            if (dishCell.value) {
                menu[dayMapping[col]].push({
                    key,                     // e.g., "Soup of the day"
                    dish: dishCell.value,    // e.g., "Beef Chili"
                    allergens: allergensCell.value,
                    dietary: dietaryCell.value
                });
            }
        }
    }

    return menu;
}

export function getPrettyMenu(rawMenu) {
    const categoryMapping = {
        'Entrée ONE': 'entrees',
        'Entrée TWO': 'entrees',
        'Vegetarian Entrée': 'entrees',
        'Vegan Entrée': 'entrees',
        'Soup of the day': 'soups',
        'Vegetarian Soup of the Day': 'soups',
        'Pasta Sauce ONE': 'pastas',
        'Pasta Sauce TWO': 'pastas',
        'Dinner Roll': 'rolls',
        'Dessert': 'dessert'
    };

    const prettyMenu = {};

    Object.keys(rawMenu).forEach(day => {
        prettyMenu[day] = {
            entrees: [],
            soups: [],
            pastas: [],
            rolls: [],
            dessert: []
        };

        rawMenu[day].forEach(entry => {
            if (entry.key && categoryMapping.hasOwnProperty(entry.key)) {
                const category = categoryMapping[entry.key];
                prettyMenu[day][category].push({
                    dish: entry.dish,
                    allergens: entry.allergens,
                    dietary: entry.dietary,
                    originalKey: entry.key
                });
            }
        });
    });

    return prettyMenu;
}

export async function fetchPrettyMenu(apiKey) {
    const rawMenu = await fetchMenu(SPREADSHEET_ID, apiKey);
    return getPrettyMenu(rawMenu);
}

