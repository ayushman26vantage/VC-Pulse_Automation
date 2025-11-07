const { expect } = require('@playwright/test');
const { timeout } = require('../../playwright.config');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async setUp() {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        // Set default timeout
        this.page.setDefaultTimeout(30000);
        this.page.setDefaultNavigationTimeout(30000);
    }

    async tearDown() {
        // Playwright handles cleanup automatically
    }

    // Wait for element to be visible
    async waitForElement(selector, timeout = 30000) {
        return await this.page.waitForSelector(selector, { 
            state: 'attached', 
            timeout: timeout 
        });
    }

    // Wait for element to be attached to DOM
    async waitForElementAttached(selector, timeout = 30000) {
        return await this.page.waitForSelector(selector, { 
            state: 'attached', 
            timeout: timeout 
        });
    }

    // Click element with retry
    async clickElement(selector, timeout = 30000) {
        await this.waitForElement(selector, timeout);
        await this.page.click(selector);
    }

    // Fill input field
    async fillInput(selector, text, timeout = 30000) {
        await this.waitForElement(selector, timeout);
        await this.page.fill(selector, text);
    }

    // Clear and fill input field
    async clearAndFill(selector, text, timeout = 30000) {
        await this.waitForElement(selector, timeout);
        await this.page.clear(selector);
        await this.page.fill(selector, text);
    }

    // Get text content
    async getText(selector, timeout = 30000) {
        await this.waitForElement(selector, timeout);
        return await this.page.textContent(selector);
    }

    // Check if element is visible
    async isVisible(selector, timeout = 5000) {
        try {
            await this.page.waitForSelector(selector, { 
                state: 'visible', 
                timeout: timeout 
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    // Wait for navigation
    async waitForNavigation(timeout = 30000) {
        return await this.page.waitForLoadState('networkidle', { timeout });
    }

    // Take screenshot
    async takeScreenshot(name) {
        const timestamp = new Date().getTime();
        await this.page.screenshot({ 
            path: `screenshots/${name}-${timestamp}.png`,
            fullPage: true 
        });
    }

    // Scroll to element
    async scrollToElement(selector) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    // Hover over element
    async hoverElement(selector) {
        await this.waitForElement(selector);
        await this.page.hover(selector);
    }

    // Wait for multiple windows and switch to new one
    async waitForNewWindowAndSwitch() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            // The action that triggers the new window
        ]);
        return newPage;
    }

    // Switch to window by index
    async switchToWindow(index) {
        const pages = this.page.context().pages();
        if (pages[index]) {
            this.page = pages[index];
            return this.page;
        }
        throw new Error(`Window at index ${index} not found`);
    }

    // Get all window handles
    async getAllWindows() {
        return this.page.context().pages();
    }

    // Execute JavaScript
    async executeScript(script, ...args) {
        return await this.page.evaluate(script, ...args);
    }

    // Wait for specific text to appear
    async waitForText(text, timeout = 30000) {
        await this.page.waitForSelector(`text=${text}`, { timeout });
    }

    // Wait for URL to contain specific text
    async waitForURL(urlPart, timeout = 30000) {
        await this.page.waitForURL(`**/*${urlPart}*`, { timeout });
    }

    // Get page title
    async getTitle() {
        return await this.page.title();
    }

    // Navigate to URL
    async navigateTo(url) {
        await this.page.goto(url);
        await this.waitForNavigation();
    }

    // Reload page
    async reload() {
        await this.page.reload();
        await this.waitForNavigation();
    }

    // Go back
    async goBack() {
        await this.page.goBack();
        await this.waitForNavigation();
    }

    // Go forward
    async goForward() {
        await this.page.goForward();
        await this.waitForNavigation();
    }

    // Wait for element to be enabled
    async waitForEnabled(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { 
            state: 'visible', 
            timeout: timeout 
        });
        // Check if element is enabled
        const isEnabled = await this.page.locator(selector).isEnabled();
        if (!isEnabled) {
            throw new Error(`Element ${selector} is not enabled`);
        }
    }

    // Double click element
    async doubleClick(selector) {
        await this.waitForElement(selector);
        await this.page.dblclick(selector);
    }

    // Right click element
    async rightClick(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector, { button: 'right' });
    }

    // Select option from dropdown
    async selectOption(selector, value) {
        await this.waitForElement(selector);
        await this.page.selectOption(selector, value);
    }

    // Check checkbox
    async checkCheckbox(selector) {
        await this.waitForElement(selector);
        await this.page.check(selector);
    }

    // Uncheck checkbox
    async uncheckCheckbox(selector) {
        await this.waitForElement(selector);
        await this.page.uncheck(selector);
    }

    // Wait for element to disappear
    async waitForElementToDisappear(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { 
            state: 'detached', 
            timeout: timeout 
        });
    }

    async returnLocatorForExpect(selector) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    return locator;
    }



      // BasePage.ts
async assertText(xpath, expected) {
  try {
    const el = this.page.locator(`xpath=${xpath}`);
    await el.waitFor({ state: "visible", timeout: 7000 });

    const raw = (await el.textContent()) ?? "";

    // Normalize whitespace (collapse + trim)
    const normalize = (s) => s.replace(/\s+/g, " ").trim();

    const actualText = normalize(raw);
    const expectedText = normalize(expected);

    if (actualText !== expectedText) {
      throw new Error(
        `Expected text "${expectedText}" but got "${actualText}"`
      );
    }
     console.log("[INFO] Text assertion passed:", `Got '${actualText}' which was expected`);
    return {
      status: "success" ,
      message: `✅ Text matched: actual "${actualText}" === expected "${expectedText}"`,
      actualText,
      expectedText,
    };
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : JSON.stringify(error);

    console.error("[INFO] Text assertion failed:", msg);

    return {
      status: "failure" ,
      message: `❌ Failed: Expected "${expected}"`,
      error: msg,
    };
  }
}




  async assertLink(expectedLink) {
    try {
      await this.page.waitForTimeout(1000);
      const actualLink = this.page.url(); 

      console.log(`[INFO] Actual URL: ${actualLink}`);
      console.log(`[INFO] Expected URL: ${expectedLink}`);

      // Example: focus on shared path from '/fit' onward (strip query)
      const anchor = '/fit';
      const actualIdx = actualLink.indexOf(anchor);
      const expectedIdx = expectedLink.indexOf(anchor);

      const actualPath = actualIdx === -1 ? '' : actualLink.substring(actualIdx).split('?')[0];
      const expectedPath = expectedIdx === -1 ? '' : expectedLink.substring(expectedIdx).split('?')[0];

      console.log(`[INFO] Actual path after ${anchor}: ${actualPath}`);
      console.log(`[INFO] Expected path after ${anchor}: ${expectedPath}`);

      if (!actualPath.includes(expectedPath)) {
        throw new Error(`Actual URL path "${actualPath}" does not include expected path "${expectedPath}"`);
      }

      console.log('[INFO] URL path verification passed.');
      return { status: 'success', message: `Actual URL path includes expected path: ${expectedPath}` };
    } catch (error) {
      const msg = this.errMsg(error);
      console.error('[ERROR] URL assertion failed:', msg);
      return { status: 'failure', message: msg };
    }
  }


  generateRandomName(prefix = 'Test', length = 8) {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, length + 2);
        return `${prefix}_${randomString}_${timestamp}`;
    }


    generateRandomEmail(domain = 'test.com') {
        const randomString = Math.random().toString(36).substring(2, 10);
        const timestamp = new Date().getTime().toString().slice(-4);
        return `test_${randomString}_${timestamp}@${domain}`;
    }

    // Generate random number within range
    generateRandomNumber(min = 1000, max = 9999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate random date (future date within next 30 days)
    generateRandomFutureDate(daysFromNow = 30) {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * daysFromNow) + 1);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    }



}

module.exports = BasePage;