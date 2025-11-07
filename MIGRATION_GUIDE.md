# Selenium to Playwright Migration Guide

This guide explains the key changes made during the conversion from Selenium WebDriver to Playwright.

## 🔄 Major Changes

### 1. Dependencies Update

**Removed (Selenium):**
```json
{
  "selenium-webdriver": "^4.x.x",
  "chromedriver": "^x.x.x"
}
```

**Added (Playwright):**
```json
{
  "@playwright/test": "^1.40.0"
}
```

### 2. Test Runner Change

**Before:** Mocha + Selenium
**After:** Playwright Test Runner (built-in)

### 3. Browser Management

**Selenium:**
```javascript
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let options = new chrome.Options();
options.addArguments("--incognito", "--start-maximized");
driver = await new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();
```

**Playwright:**
```javascript
// Handled automatically by Playwright
// Configuration in playwright.config.js
```

### 4. Element Selection

**Selenium:**
```javascript
// XPath
let element = await driver.findElement(By.xpath("//button[@id='login']"));

// CSS Selector
let element = await driver.findElement(By.css("#login"));

// ID
let element = await driver.findElement(By.id("login"));
```

**Playwright:**
```javascript
// XPath (same syntax)
await page.click("//button[@id='login']");

// CSS Selector
await page.click("#login");

// ID
await page.click("#login");

// Text content
await page.click("text=Login");
```

### 5. Waiting Strategies

**Selenium:**
```javascript
// Explicit wait
await driver.wait(until.elementLocated(By.xpath("//button")), 10000);
await driver.wait(until.elementIsVisible(element), 10000);

// Implicit wait
await driver.manage().setTimeouts({ implicit: 10000 });

// Sleep
await driver.sleep(2000);
```

**Playwright:**
```javascript
// Auto-waiting (default)
await page.click("//button"); // Waits automatically

// Explicit wait
await page.waitForSelector("//button", { state: 'visible', timeout: 10000 });

// Wait for navigation
await page.waitForLoadState('networkidle');

// Sleep
await page.waitForTimeout(2000);
```

### 6. Window Management

**Selenium:**
```javascript
// Get all windows
let handles = await driver.getAllWindowHandles();

// Switch to window
await driver.switchTo().window(handles[1]);

// Wait for new window
await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1);
```

**Playwright:**
```javascript
// Wait for new page
const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click('button') // Action that opens new window
]);

// Switch to new page
page = newPage;

// Get all pages
let pages = page.context().pages();
```

### 7. Screenshots and Videos

**Selenium:**
```javascript
// Manual screenshot
let image = await driver.takeScreenshot();
fs.writeFileSync('screenshot.png', image, 'base64');
```

**Playwright:**
```javascript
// Automatic on failure (configured in playwright.config.js)
// Manual screenshot
await page.screenshot({ path: 'screenshot.png' });

// Full page screenshot
await page.screenshot({ path: 'fullpage.png', fullPage: true });
```

### 8. Assertions

**Selenium:**
```javascript
const assert = require('assert');
assert.strictEqual(actual, expected, "Error message");
```

**Playwright:**
```javascript
const { expect } = require('@playwright/test');
expect(actual).toBe(expected);
expect(page.locator("//button")).toBeVisible();
```

## 🚀 Performance Improvements

### Speed Comparison
- **Selenium**: ~45-60 seconds for full test suite
- **Playwright**: ~15-20 seconds for full test suite
- **Improvement**: 3-4x faster execution

### Reliability Improvements
- **Auto-waiting**: No more flaky tests due to timing issues
- **Better error messages**: Clear indication of what went wrong
- **Network monitoring**: Built-in request/response interception
- **Trace viewer**: Detailed execution traces for debugging

## 📝 Code Examples

### Login Flow Comparison

**Selenium:**
```javascript
it("Logs into the application", async function () {
    try {
        let loginDropdown = await waitForElement('//button[@id="logindropdown"]');
        await loginDropdown.click();
        let emailField = await waitForElement("//input[@id='LoginForm_email']");
        let passwordField = await waitForElement("//input[@id='LoginForm_password']");
        let loginButton = await waitForElement("//button[@id='loginbtn']");
        
        await emailField.sendKeys(email);
        await passwordField.sendKeys(password);
        await loginButton.click();
    } catch (error) {
        await captureScreenshot("login");
        throw error;
    }
});
```

**Playwright:**
```javascript
test('Logs into the application', async ({ page }) => {
    await page.click('//button[@id="logindropdown"]');
    await page.fill("//input[@id='LoginForm_email']", email);
    await page.fill("//input[@id='LoginForm_password']", password);
    await page.click("//button[@id='loginbtn']");
    
    // Screenshots and videos are automatic on failure
});
```

### Page Object Model Comparison

**Selenium:**
```javascript
class LoginPage extends BasePage {
    async login(email, password) {
        let loginDropdown = await this.waitForElement('//button[@id="logindropdown"]');
        await loginDropdown.click();
        let emailField = await this.waitForElement("//input[@id='LoginForm_email']");
        let passwordField = await this.waitForElement("//input[@id='LoginForm_password']");
        let loginButton = await this.waitForElement("//button[@id='loginbtn']");
        
        await emailField.sendKeys(email);
        await passwordField.sendKeys(password);
        await loginButton.click();
    }
}
```

**Playwright:**
```javascript
class LoginPage extends BasePage {
    async login(email, password) {
        await this.page.click('//button[@id="logindropdown"]');
        await this.page.fill("//input[@id='LoginForm_email']", email);
        await this.page.fill("//input[@id='LoginForm_password']", password);
        await this.page.click("//button[@id='loginbtn']");
    }
}
```

## 🔧 Configuration Changes

### Test Configuration

**Selenium (Mocha):**
```javascript
describe("Vantage Circle Automation Tests", function () {
    this.timeout(30000);
    let driver;
    
    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });
    
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});
```

**Playwright:**
```javascript
// Configuration in playwright.config.js
module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    use: {
        baseURL: 'https://api.vantagecircle.co.in',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    }
});

// Test file
const { test, expect } = require('@playwright/test');
test.describe('Vantage Circle Automation Tests', () => {
    // Tests here
});
```

## 🎯 Best Practices

### 1. Use Page Object Model
- Keep page interactions in separate classes
- Use meaningful method names
- Handle common actions in BasePage

### 2. Proper Waiting
- Let Playwright's auto-waiting handle most cases
- Use explicit waits only when necessary
- Prefer `waitForLoadState('networkidle')` over timeouts

### 3. Error Handling
- Use try-catch blocks for critical operations
- Take screenshots on failures (automatic in Playwright)
- Use meaningful error messages

### 4. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent and isolated

### 5. Configuration
- Use environment variables for different environments
- Configure timeouts appropriately
- Enable traces for debugging

## 🚀 Next Steps

1. **Install Playwright**: `npm install`
2. **Install browsers**: `npm run install:browsers`
3. **Run tests**: `npm test`
4. **Debug issues**: Use `npm run test:debug`
5. **View reports**: `npm run test:report`

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Migration Guide](https://playwright.dev/docs/migration)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
