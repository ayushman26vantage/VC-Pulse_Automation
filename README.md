# Vantage Pulse Automation Tests - Playwright

This project has been converted from Selenium WebDriver to Playwright for modern web automation testing of the Vantage Pulse application.

## 🚀 Key Improvements with Playwright

- **Faster execution**: Playwright is significantly faster than Selenium
- **Better reliability**: More stable element interactions and waiting mechanisms
- **Modern API**: Cleaner, more intuitive API design
- **Built-in features**: Screenshots, videos, traces, and network monitoring out of the box
- **Cross-browser support**: Chromium, Firefox, and WebKit support
- **Auto-waiting**: Intelligent waiting for elements and network conditions

## 📁 Project Structure

```
PulseTestJS/
├── tests/                          # Playwright test files
│   ├── pages/                      # Page Object Model classes
│   │   ├── BasePage.js            # Base page with common methods
│   │   ├── LoginPage.js           # Login page interactions
│   │   └── DashboardPage.js       # Dashboard interactions
│   ├── utils/                      # Utility functions
│   │   └── RandomTitle.js         # Random data generation
│   ├── overview.spec.js           # Main survey creation flow
│   ├── attempt-survey.spec.js     # Survey attempt tests
│   ├── create-survey.spec.js      # Survey creation tests
│   └── use-existing-survey.spec.js # Template-based survey tests
├── playwright.config.js            # Playwright configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run install:browsers
   ```

3. **Verify installation:**
   ```bash
   npx playwright --version
   ```

## 🧪 Running Tests

### Basic Test Execution
```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Browser-Specific Tests
```bash
# Run tests in Chrome
npm run test:chrome

# Run tests in Firefox
npm run test:firefox

# Run tests in Safari/WebKit
npm run test:webkit
```

### Specific Test Files
```bash
# Run specific test file
npx playwright test tests/overview.spec.js

# Run tests matching a pattern
npx playwright test --grep "survey creation"
```

## 📊 Test Reports

After running tests, you can view detailed reports:

```bash
# View HTML report
npm run test:report

# View test results
npx playwright show-report
```

## 🔧 Configuration

The `playwright.config.js` file contains all configuration options:

- **Base URL**: Set to `https://api.vantagecircle.co.in`
- **Timeouts**: 30 seconds for actions and navigation
- **Screenshots**: Captured on failure
- **Videos**: Recorded for failed tests
- **Traces**: Available for debugging
- **Browsers**: Chrome, Firefox, and Safari support

## 📝 Key Conversion Changes

### 1. Page Object Model Updates

**Before (Selenium):**
```javascript
const { Builder, By, until } = require("selenium-webdriver");

class BasePage {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }
    
    async waitForElement(xpath, timeout = 20000) {
        return await this.driver.wait(
            until.elementLocated(By.xpath(xpath)),
            timeout
        );
    }
}
```

**After (Playwright):**
```javascript
const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    async waitForElement(selector, timeout = 30000) {
        return await this.page.waitForSelector(selector, { 
            state: 'visible', 
            timeout: timeout 
        });
    }
}
```

### 2. Test Structure Changes

**Before (Selenium with Mocha):**
```javascript
describe("Vantage Circle Automation Tests", function () {
    let driver;
    
    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });
    
    it("Navigates to the URL", async function () {
        await driver.get("https://api.vantagecircle.co.in/");
        let title = await driver.getTitle();
        assert.strictEqual(title, "Expected Title");
    });
});
```

**After (Playwright):**
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Vantage Circle Automation Tests', () => {
    test('Navigates to the URL', async ({ page }) => {
        await page.goto('https://api.vantagecircle.co.in/');
        await expect(page).toHaveTitle("Expected Title");
    });
});
```

### 3. Element Interaction Improvements

**Before (Selenium):**
```javascript
let element = await driver.wait(until.elementLocated(By.xpath("//button[@id='login']")));
await driver.wait(until.elementIsVisible(element));
await element.click();
```

**After (Playwright):**
```javascript
await page.click("//button[@id='login']");
// Playwright automatically waits for element to be visible and clickable
```

## 🎯 Test Categories

### 1. Overview Tests (`overview.spec.js`)
- Complete survey creation workflow
- Login and navigation
- Survey configuration
- Launch process

### 2. Survey Attempt Tests (`attempt-survey.spec.js`)
- User survey participation
- Pending survey detection
- Survey completion flow

### 3. Survey Creation Tests (`create-survey.spec.js`)
- Custom survey creation
- Form filling and validation
- Scheduling and configuration

### 4. Template Tests (`use-existing-survey.spec.js`)
- Using existing survey templates
- Template selection and customization
- Quick survey setup

## 🔍 Debugging & Troubleshooting

### Debug Mode
```bash
# Run tests in debug mode
npm run test:debug

# Debug specific test
npx playwright test tests/overview.spec.js --debug
```

### Screenshots & Videos
- Screenshots are automatically captured on test failures
- Videos are recorded for failed tests
- All artifacts are saved in `test-results/` directory

### Trace Viewer
```bash
# View detailed execution traces
npx playwright show-trace test-results/trace.zip
```

## 🚀 Performance Benefits

- **3-5x faster execution** compared to Selenium
- **Reduced flakiness** with intelligent auto-waiting
- **Better error messages** with detailed failure information
- **Parallel execution** by default
- **Network interception** capabilities for API testing

## 📋 Migration Checklist

- ✅ Converted BasePage class with common methods
- ✅ Updated LoginPage with Playwright API
- ✅ Converted DashboardPage interactions
- ✅ Updated utility functions (RandomTitle)
- ✅ Converted all test files to Playwright format
- ✅ Updated package.json with Playwright dependencies
- ✅ Created comprehensive Playwright configuration
- ✅ Added multiple test execution options
- ✅ Implemented proper error handling and screenshots

## 🤝 Contributing

1. Follow the existing code structure
2. Use Page Object Model pattern
3. Add proper error handling
4. Include meaningful test descriptions
5. Update documentation for new features

## 📞 Support

For issues or questions:
1. Check the [Playwright documentation](https://playwright.dev/)
2. Review test logs and screenshots
3. Use debug mode for troubleshooting
4. Check browser console for JavaScript errors

---

**Note**: This project has been successfully converted from Selenium WebDriver to Playwright, providing better performance, reliability, and developer experience for Vantage Pulse automation testing.