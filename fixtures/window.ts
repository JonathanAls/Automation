import { test as base, chromium } from '@playwright/test';

export const test = base.extend({
  context: async ({}, use) => {

    const browser = await chromium.launch({
      headless: false
    });

    const context = await browser.newContext({
      viewport: null,
      deviceScaleFactor: undefined
    });

    const page = await context.newPage();
    const session = await context.newCDPSession(page);

    const { windowId } = await session.send('Browser.getWindowForTarget');

    // Monitor 2 full (1920x1080)
    await session.send('Browser.setWindowBounds', {
      windowId,
      bounds: {
        left: 1920,
        top: 0,
        width: 1920,
        height: 1080
      }
    });

    await use(context);
    await browser.close();
  }
});

export { expect } from '@playwright/test';