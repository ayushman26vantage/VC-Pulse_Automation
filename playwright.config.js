// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Enable parallel testing
  fullyParallel: true,

  // Prevent accidental .only on CI
  forbidOnly: !!process.env.CI,

  // Retry failing tests only on CI
  retries: process.env.CI ? 2 : 0,

  // Use only 1 worker on CI
  workers: process.env.CI ? 1 : undefined,

  timeout:60000,

   expect: {
    timeout: 15000, // 15 seconds for assertions
  },

  // Reporters
  reporter: [
    ["line"],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],

  use: {
    baseURL: 'https://api.vantagecircle.co.in',

    // Capture trace on first retry
    trace: 'on-first-retry',

    // Only take screenshots/videos on failure
    screenshot: 'only-on-failure',
   // video: 'retain-on-failure',

    // Reasonable timeouts for actions/navigation
    actionTimeout: 30000,
    navigationTimeout: 30000,

    // Disable headless if needed (can override per CLI)
    headless: false,

    // Safer viewport for responsive testing
    viewport: { width: 1920, height: 1080 },
  },

  // Browser Projects
  projects: [ {
      name: 'Google Chrome',
      use: { 
        browserName: 'chromium',
        channel: 'chrome',
        storageState: undefined, // Incognito mode
        viewport: null, // Use full native screen size
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        isMobile: false,
        hasTouch: false,
         launchOptions: {
          args: ['--disable-dev-shm-usage', '--start-maximized'],
        },
        video: 'retain-on-failure',
      },
      
      testIgnore: ['**/mobile/**', '**/api-only/**']
    },
     {
      name: 'chrome-local',
      use: {
        channel: 'chrome',
        headless: false,
        viewport: null, // use real OS window size
        launchOptions: {
          args: ['--disable-dev-shm-usage', '--start-maximized'],
        },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: null,
        launchOptions: {
      args: ['--incognito', '--start-maximized'],
    },
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1366, height: 768 },
      }
    },
  ],

  // Optional: run local dev server if needed
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
