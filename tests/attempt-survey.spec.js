const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');

test.describe('Vantage Circle Survey Attempt Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.setUp();
    });

    test('Navigates to the URL and checks the page title', async () => {
        const isTitleCorrect = await loginPage.navigateToLoginPage();
        expect(isTitleCorrect).toBe(true);
    });

    test('Logs into the application', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        // Wait for login to complete
        await page.waitForTimeout(4000);
        
        // Verify login was successful
        await expect(page.locator("//img[@alt='profileImage']")).toBeVisible();
    });

    test('Handles Redeem Pop up if present', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        await loginPage.handleRedeemPopup();
        
        // Test continues regardless of popup presence
    });

    test('Clicks Home', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        
        // Verify we're still on the main page
        await expect(page).toHaveTitle(/Vantage Circle/);
    });

    test('Checks if there is a pending survey', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        
        // Check for pending survey
        const hasPendingSurvey = await loginPage.checkPendingSurvey();
        
        if (hasPendingSurvey) {
            console.log("Found pending survey");
            expect(hasPendingSurvey).toBe(true);
        } else {
            console.log("No pending survey found");
        }
    });

    test('Start Survey', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        
        // Check for pending survey and start it
        const hasPendingSurvey = await loginPage.checkPendingSurvey();
        
        if (hasPendingSurvey) {
            await loginPage.startSurvey();
            console.log("Survey started successfully");
        } else {
            console.log("No survey to start");
        }
    });
});
