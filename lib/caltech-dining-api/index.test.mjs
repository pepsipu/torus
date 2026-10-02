import assert from 'node:assert/strict';
import test from 'node:test';
import { getPrettyMenu } from './index.js';

// Food rows from the dining sheet for Friday, October 2, 2026.
const friday = [
    ['Soup of the day', 'Clam Chowder'],
    ['Vegetarian Soup of the day', 'Vegan Chili'],
    ['Entrée ONE', 'BBQ Chicken'],
    ['Entrée TWO', 'Philly Cheese Steak Sandwiches'],
    ['Vegetarian Entrée', 'Vegetarian Pot Pie'],
    ['Vegan Entrée', 'Falafel with Pita Lettuce and Tomato'],
    ['Vegetable of the Day', 'Carrots and Celery Sticks'],
    ['Starch of the Day', 'Garlic Waffle Fries'],
    ['Pasta of the Day', 'Pasta of the Day'],
    ['Pasta Sauce ONE', 'Marinara'],
    ['Pasta Sauce TWO', 'Pesto'],
    ['Dinner Roll', 'Garlic Bread'],
    ['Dessert', 'Novelties'],
].map(([key, dish]) => ({ key, dish, allergens: null, dietary: null }));

test('formatting preserves every food row from the dining sheet', () => {
    const menu = getPrettyMenu({ friday }).friday;
    const entries = Object.values(menu).flat();

    assert.equal(entries.length, friday.length);
    for (const { key, ...item } of friday) {
        assert.deepEqual(entries.find(entry => entry.originalKey === key), {
            ...item,
            originalKey: key,
        });
    }
    assert.deepEqual(menu.sides.map(item => item.dish), [
        'Carrots and Celery Sticks',
        'Garlic Waffle Fries',
    ]);
    assert.deepEqual(menu.pastas.map(item => item.dish), [
        'Pasta of the Day',
        'Marinara',
        'Pesto',
    ]);
});

test('side and pasta metadata is preserved independently for each day', () => {
    const monday = [{
        key: 'Starch of the Day',
        dish: 'Roasted Garlic Mashed Potatoes',
        allergens: 'Dairy',
        dietary: 'Gluten Free Vegetarian',
    }];
    const tuesday = [{
        key: 'Pasta of the Day',
        dish: 'Pasta of the Day',
        allergens: 'Gluten',
        dietary: 'Vegan',
    }];
    const menu = getPrettyMenu({ monday, tuesday, wednesday: [] });

    for (const [day, category, [entry]] of [
        ['monday', 'sides', monday],
        ['tuesday', 'pastas', tuesday],
    ]) {
        const { key, ...item } = entry;
        assert.deepEqual(menu[day][category], [{ ...item, originalKey: key }]);
        assert.equal(Object.values(menu[day]).flat().length, 1);
    }
    assert.deepEqual(Object.values(menu.wednesday).flat(), []);
});
