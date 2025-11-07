const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const DashboardPage = require('./pages/DashboardPage');

test.describe('Vantage Circle Use Existing Survey Tests', () => {
    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.setUp();
    });

    test('Navigates to the URL and checks the page title', async () => {
        const isTitleCorrect = await loginPage.navigateToLoginPage();
        expect(isTitleCorrect).toBe(true);
    });

    test('Logs into the application', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        // Verify login was successful
        await expect(page.locator("//img[@alt='profileImage']")).toBeVisible();
    });

    test('Accesses the dashboard', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            // The click action that triggers the new window
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        const title = await newPage.title();
        expect(title).toBe("Vantage Circle | Dashboard");
    });

    test("Clicks the Create button", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Verify Create button was clicked
        await expect(newPage.locator("//span[normalize-space()='Create']")).toBeVisible();
    });

    test("Creating Survey using existing survey", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Verify template was selected
        await expect(newPage.locator("(//button[contains(text(),'Use Template')])[9]")).toBeVisible();
    });

    test("Survey name adding", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Add survey name
        const surveyName = "PulseTest122Survey3830";
        await newPage.waitForSelector("(//input[@id='inputField'])[1]", { timeout: 20000 });
        await newPage.waitForTimeout(2000);
        await newPage.fill("(//input[@id='inputField'])[1]", surveyName);
        await newPage.waitForTimeout(2000);
        
        // Click Next
        await newPage.waitForSelector("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.waitForTimeout(2000);
        
        // Verify survey name was added
        await expect(newPage.locator("(//input[@id='inputField'])[1]")).toHaveValue(surveyName);
    });

    test("Completes survey scheduling - adding date and time", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Add survey name
        const surveyName = "PulseTest122Survey3830";
        await newPage.waitForSelector("(//input[@id='inputField'])[1]", { timeout: 20000 });
        await newPage.waitForTimeout(2000);
        await newPage.fill("(//input[@id='inputField'])[1]", surveyName);
        await newPage.waitForTimeout(2000);
        
        // Click Next
        await newPage.waitForSelector("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.waitForTimeout(2000);
        
        // Schedule survey
        await dashboardPage.scheduleSurvey("10-09-2024", "12:00");
        
        // Verify scheduling was completed
        await expect(newPage.locator("(//input[@id='mat-input-0'])[1]")).toHaveValue("10-09-2024");
    });

    test("Completes Frequency", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Add survey name
        const surveyName = "PulseTest122Survey3830";
        await newPage.waitForSelector("(//input[@id='inputField'])[1]", { timeout: 20000 });
        await newPage.waitForTimeout(2000);
        await newPage.fill("(//input[@id='inputField'])[1]", surveyName);
        await newPage.waitForTimeout(2000);
        
        // Click Next
        await newPage.waitForSelector("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.waitForTimeout(2000);
        
        // Schedule survey
        await dashboardPage.scheduleSurvey("10-09-2024", "12:00");
        
        // Select frequency
        await dashboardPage.selectFrequency();
        
        // Verify frequency selection was completed
        await expect(newPage.locator("(//input[@id='mat-radio-2-input'])[1]")).toBeChecked();
    });

    test("Selecting Next from Audience page", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Add survey name
        const surveyName = "PulseTest122Survey3830";
        await newPage.waitForSelector("(//input[@id='inputField'])[1]", { timeout: 20000 });
        await newPage.waitForTimeout(2000);
        await newPage.fill("(//input[@id='inputField'])[1]", surveyName);
        await newPage.waitForTimeout(2000);
        
        // Click Next
        await newPage.waitForSelector("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.waitForTimeout(2000);
        
        // Schedule survey
        await dashboardPage.scheduleSurvey("10-09-2024", "12:00");
        
        // Select frequency
        await dashboardPage.selectFrequency();
        
        // Select audience
        await dashboardPage.selectAudience();
        
        // Verify audience selection was completed
        await expect(newPage.locator("(//button[@type='submit'][normalize-space()='Next'])[3]")).toBeVisible();
    });

    test("Selecting Next from Email page", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Add survey name
        const surveyName = "PulseTest122Survey3830";
        await newPage.waitForSelector("(//input[@id='inputField'])[1]", { timeout: 20000 });
        await newPage.waitForTimeout(2000);
        await newPage.fill("(//input[@id='inputField'])[1]", surveyName);
        await newPage.waitForTimeout(2000);
        
        // Click Next
        await newPage.waitForSelector("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.waitForTimeout(2000);
        
        // Schedule survey
        await dashboardPage.scheduleSurvey("10-09-2024", "12:00");
        
        // Select frequency
        await dashboardPage.selectFrequency();
        
        // Select audience
        await dashboardPage.selectAudience();
        
        // Select email
        await dashboardPage.selectEmail();
        
        // Verify email selection was completed
        await expect(newPage.locator("(//button[@type='submit'][normalize-space()='Next'])[4]")).toBeVisible();
    });

    test("Survey Preview and Launch Survey", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("admin@xyzank.com", "welcome");
        
        let dashboardButton = await page.waitForSelector("//button[normalize-space()='Access your dashboard']", { timeout: 10000 });
        await page.waitForTimeout(2000);
        await dashboardButton.click();
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
        ]);
        
        // Switch to the new page
        await newPage.waitForLoadState('networkidle');
        
        // Click Create button
        await newPage.waitForSelector("//span[normalize-space()='Create']");
        await newPage.click("//span[normalize-space()='Create']");
        await newPage.waitForTimeout(4000);
        
        // Use existing survey template
        await dashboardPage.useExistingSurvey(9);
        
        // Add survey name
        const surveyName = "PulseTest122Survey3830";
        await newPage.waitForSelector("(//input[@id='inputField'])[1]", { timeout: 20000 });
        await newPage.waitForTimeout(2000);
        await newPage.fill("(//input[@id='inputField'])[1]", surveyName);
        await newPage.waitForTimeout(2000);
        
        // Click Next
        await newPage.waitForSelector("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await newPage.waitForTimeout(2000);
        
        // Schedule survey
        await dashboardPage.scheduleSurvey("10-09-2024", "12:00");
        
        // Select frequency
        await dashboardPage.selectFrequency();
        
        // Select audience
        await dashboardPage.selectAudience();
        
        // Select email
        await dashboardPage.selectEmail();
        
        // Launch survey
        await dashboardPage.launchSurvey();
        
        // Verify survey was launched
        await expect(newPage.locator("(//button[normalize-space()='Launch Survey'])[1]")).toBeVisible();
    });
});
