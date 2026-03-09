import { test, expect } from '@playwright/test';


test('Prueba piloto', async ({browser}) =>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://alsuper.com/');
    }
);