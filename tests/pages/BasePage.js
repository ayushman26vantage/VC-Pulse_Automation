

class BasePage {
    constructor(page) {
        try {
            this.page = page;
        } catch (error) {
            console.error(`Failed to initialize BasePage: ${error.message}`);
            throw error;
        }
    }

    async setUp() {
        try {
            await this.page.setViewportSize({ width: 1920, height: 1080 });
            // Set default timeout
            this.page.setDefaultTimeout(30000);
            this.page.setDefaultNavigationTimeout(30000);
            return { status: "success", message: "Page setup completed successfully" };
        } catch (error) {
            return { status: "error", message: `Page setup failed: ${error.message}` };
        }
    }

    async tearDown() {
        try {
            // Playwright handles cleanup automatically
            return { status: "success", message: "Teardown completed" };
        } catch (error) {
            return { status: "error", message: `Teardown failed: ${error.message}` };
        }
    }

    // Wait for element to be visible
    async waitForElement(selector, timeout = 30000) {
        try {
            const element = await this.page.waitForSelector(selector, { 
                state: 'attached', 
                timeout: timeout 
            });
            return { status: "success", message: `Element found: ${selector}`, element: element };
        } catch (error) {
            return { status: "error", message: `Element not found: ${selector} - ${error.message}` };
        }
    }

    // Wait for element to be attached to DOM
    async waitForElementAttached(selector, timeout = 30000) {
        try {
            const element = await this.page.waitForSelector(selector, { 
                state: 'attached', 
                timeout: timeout 
            });
            return { status: "success", message: `Element attached: ${selector}`, element: element };
        } catch (error) {
            return { status: "error", message: `Element not attached: ${selector} - ${error.message}` };
        }
    }

    // Click element with retry
    async clickElement(selector, timeout = 30000) {
        try {
            await this.waitForElement(selector, timeout);
            await this.page.click(selector);
            return { status: "success", message: `Element clicked successfully: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to click element: ${selector} - ${error.message}` };
        }
    }

    // Fill input field
    async fillInput(selector, text, timeout = 30000) {
        try {
            await this.waitForElement(selector, timeout);
            await this.page.fill(selector, text);
            return { status: "success", message: `Input filled successfully: ${selector} with text: ${text}` };
        } catch (error) {
            return { status: "error", message: `Failed to fill input: ${selector} - ${error.message}` };
        }
    }

    // Clear and fill input field
    async clearAndFill(selector, text, timeout = 30000) {
        try {
            await this.waitForElement(selector, timeout);
            await this.page.clear(selector);
            await this.page.fill(selector, text);
            return { status: "success", message: `Input cleared and filled successfully: ${selector} with text: ${text}` };
        } catch (error) {
            return { status: "error", message: `Failed to clear and fill input: ${selector} - ${error.message}` };
        }
    }

    // Get text content
    async getText(selector, timeout = 30000) {
        try {
            await this.waitForElement(selector, timeout);
            const text = await this.page.textContent(selector);
            return { status: "success", message: `Text retrieved successfully: ${selector}`, text: text };
        } catch (error) {
            return { status: "error", message: `Failed to get text: ${selector} - ${error.message}` };
        }
    }

    async getAllTexts(locator) {
    try {
        const allTexts = await this.page.locator(locator).evaluateAll((spans) => {
            return spans.map(span => span.textContent?.trim()).filter(text => text);
        });
        
        return { status: "success",  message: `Retrieved ${allTexts.length} span texts`, texts: allTexts };
        
    } catch (error) {
        return { status: "error", message: `Failed: ${error.message}` 
        };
    }
}
    // Check if element is visible
    async isVisible(selector, timeout = 5000) {
        try {
            await this.page.waitForSelector(selector, { 
                state: 'visible', 
                timeout: timeout 
            });
            return { status: "success", message: `Element is visible: ${selector}`, visible: true };
        } catch (error) {
            return { status: "success", message: `Element is not visible: ${selector}`, visible: false };
        }
    }

    // Wait for navigation
    async waitForNavigation(timeout = 30000) {
        try {
            await this.page.waitForLoadState('networkidle', { timeout });
            return { status: "success", message: "Navigation completed successfully" };
        } catch (error) {
            return { status: "error", message: `Navigation failed: ${error.message}` };
        }
    }

    // Take screenshot
    async takeScreenshot(name) {
        try {
            const timestamp = new Date().getTime();
            await this.page.screenshot({ 
                path: `screenshots/${name}-${timestamp}.png`,
                fullPage: true 
            });
            return { status: "success", message: `Screenshot taken: ${name}-${timestamp}.png` };
        } catch (error) {
            return { status: "error", message: `Failed to take screenshot: ${error.message}` };
        }
    }

    // Scroll to element
    async scrollToElement(selector) {
        try {
            await this.page.locator(selector).scrollIntoViewIfNeeded();
            return { status: "success", message: `Scrolled to element: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to scroll to element: ${selector} - ${error.message}` };
        }
    }

    // Hover over element
    async hoverElement(selector) {
        try {
            await this.waitForElement(selector);
            await this.page.hover(selector);
            return { status: "success", message: `Hovered over element: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to hover over element: ${selector} - ${error.message}` };
        }
    }

    // Wait for multiple windows and switch to new one
    async waitForNewWindowAndSwitch() {
        try {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                // The action that triggers the new window
            ]);
            return { status: "success", message: "New window opened and switched", page: newPage };
        } catch (error) {
            return { status: "error", message: `Failed to wait for new window: ${error.message}` };
        }
    }

    // Switch to window by index
    async switchToWindow(index) {
        try {
            const pages = this.page.context().pages();
            if (pages[index]) {
                this.page = pages[index];
                return { status: "success", message: `Switched to window index: ${index}`, page: this.page };
            }
            throw new Error(`Window at index ${index} not found`);
        } catch (error) {
            return { status: "error", message: `Failed to switch to window: ${error.message}` };
        }
    }

    // Get all window handles
    async getAllWindows() {
        try {
            const pages = this.page.context().pages();
            return { status: "success", message: "Retrieved all windows", pages: pages };
        } catch (error) {
            return { status: "error", message: `Failed to get all windows: ${error.message}` };
        }
    }

    // Execute JavaScript
    async executeScript(script, ...args) {
        try {
            const result = await this.page.evaluate(script, ...args);
            return { status: "success", message: "JavaScript executed successfully", result: result };
        } catch (error) {
            return { status: "error", message: `Failed to execute JavaScript: ${error.message}` };
        }
    }

    // Wait for specific text to appear
    async waitForText(text, timeout = 30000) {
        try {
            await this.page.waitForSelector(`text=${text}`, { timeout });
            return { status: "success", message: `Text appeared: ${text}` };
        } catch (error) {
            return { status: "error", message: `Text did not appear: ${text} - ${error.message}` };
        }
    }

    // Wait for URL to contain specific text
    async waitForURL(urlPart, timeout = 30000) {
        try {
            await this.page.waitForURL(`**/*${urlPart}*`, { timeout });
            return { status: "success", message: `URL contains: ${urlPart}` };
        } catch (error) {
            return { status: "error", message: `URL does not contain: ${urlPart} - ${error.message}` };
        }
    }

    // Get page title
    async getTitle() {
        try {
            const title = await this.page.title();
            return { status: "success", message: "Page title retrieved", title: title };
        } catch (error) {
            return { status: "error", message: `Failed to get page title: ${error.message}` };
        }
    }

    // Navigate to URL
    async navigateTo(url) {
        try {
            await this.page.goto(url);
            await this.waitForNavigation();
            return { status: "success", message: `Navigated to: ${url}` };
        } catch (error) {
            return { status: "error", message: `Failed to navigate to: ${url} - ${error.message}` };
        }
    }

    // Reload page
    async reload() {
        try {
            await this.page.reload();
            await this.waitForNavigation();
            return { status: "success", message: "Page reloaded successfully" };
        } catch (error) {
            return { status: "error", message: `Failed to reload page: ${error.message}` };
        }
    }

    // Go back
    async goBack() {
        try {
            await this.page.goBack();
            await this.waitForNavigation();
            return { status: "success", message: "Navigated back successfully" };
        } catch (error) {
            return { status: "error", message: `Failed to go back: ${error.message}` };
        }
    }

    // Go forward
    async goForward() {
        try {
            await this.page.goForward();
            await this.waitForNavigation();
            return { status: "success", message: "Navigated forward successfully" };
        } catch (error) {
            return { status: "error", message: `Failed to go forward: ${error.message}` };
        }
    }

    // Wait for element to be enabled
    async waitForEnabled(selector, timeout = 30000) {
        try {
            await this.page.waitForSelector(selector, { 
                state: 'visible', 
                timeout: timeout 
            });
            // Check if element is enabled
            const isEnabled = await this.page.locator(selector).isEnabled();
            if (!isEnabled) {
                throw new Error(`Element ${selector} is not enabled`);
            }
            return { status: "success", message: `Element is enabled: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Element is not enabled: ${selector} - ${error.message}` };
        }
    }

    // Double click element
    async doubleClick(selector) {
        try {
            await this.waitForElement(selector);
            await this.page.dblclick(selector);
            return { status: "success", message: `Double clicked element: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to double click element: ${selector} - ${error.message}` };
        }
    }

    // Right click element
    async rightClick(selector) {
        try {
            await this.waitForElement(selector);
            await this.page.click(selector, { button: 'right' });
            return { status: "success", message: `Right clicked element: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to right click element: ${selector} - ${error.message}` };
        }
    }

    // Select option from dropdown
    async selectOption(selector, value) {
        try {
            await this.waitForElement(selector);
            await this.page.selectOption(selector, value);
            return { status: "success", message: `Option selected: ${value} in ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to select option: ${value} in ${selector} - ${error.message}` };
        }
    }

    // Check checkbox
    async checkCheckbox(selector) {
        try {
            await this.waitForElement(selector);
            await this.page.check(selector);
            return { status: "success", message: `Checkbox checked: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to check checkbox: ${selector} - ${error.message}` };
        }
    }

    // Uncheck checkbox
    async uncheckCheckbox(selector) {
        try {
            await this.waitForElement(selector);
            await this.page.uncheck(selector);
            return { status: "success", message: `Checkbox unchecked: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Failed to uncheck checkbox: ${selector} - ${error.message}` };
        }
    }

    // Wait for element to disappear
    async waitForElementToDisappear(selector, timeout = 30000) {
        try {
            await this.page.waitForSelector(selector, { 
                state: 'detached', 
                timeout: timeout 
            });
            return { status: "success", message: `Element disappeared: ${selector}` };
        } catch (error) {
            return { status: "error", message: `Element did not disappear: ${selector} - ${error.message}` };
        }
    }

    async returnLocatorForExpect(selector) {
        try {
            const locator = this.page.locator(selector);
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return { status: "success", message: `Locator returned: ${selector}`, locator: locator };
        } catch (error) {
            return { status: "error", message: `Failed to return locator: ${selector} - ${error.message}` };
        }
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
                status: "success",
                message: `✅ Text matched: actual "${actualText}" === expected "${expectedText}"`,
                actualText,
                expectedText,
            };
        } catch (error) {
            const msg = error instanceof Error ? error.message : JSON.stringify(error);
            console.error("[INFO] Text assertion failed:", msg);
            return {
                status: "failure",
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
            const anchor = '/pulse';
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
            const msg = error instanceof Error ? error.message : JSON.stringify(error);
            console.error('[ERROR] URL assertion failed:', msg);
            return { status: 'failure', message: msg };
        }
    }

 generateRandomName(prefix = 'Test', length = 8) {
    try {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, length + 2);
        const result = `${prefix}_${randomString}_${timestamp}`;
        return result; // Return just the string, not an object
    } catch (error) {
        // Fallback to ensure we always return a string
        return `Test_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
    }
}

}

module.exports = BasePage;
