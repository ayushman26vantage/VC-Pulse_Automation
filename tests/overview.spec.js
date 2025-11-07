const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const DashboardPage = require('./pages/DashboardPage');
const { generateRandomSurveyName } = require('./utils/RandomTitle');

test.describe('Vantage Circle Automation Tests', () => {
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
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        
        // Verify login was successful by checking for a logged-in element
        await expect(page.locator("//img[@alt='profileImage']")).toBeVisible();
    });

    test('Handles Redeem Pop up if present', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        
        // Test continues regardless of popup presence
    });

    test('Click Home', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        
        // Verify we're still on the main page
        await expect(page).toHaveTitle(/Vantage Circle/);
    });

    test('Accesses the dashboard', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        
        await loginPage.clickProfile();
        const newPage = await loginPage.clickAdminDashboard();
        
        // Verify we're on the dashboard
        await expect(newPage).toHaveTitle("Vantage Circle | Dashboard");
    });

    test('Accesses the dashboard - switch to next window', async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        const isDashboardAccessible = await loginPage.switchToDashboardWindow();
        
        expect(isDashboardAccessible).toBe(true);
    });

    test("Clicks on product's menu dropdown - select Pulse", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        
        await dashboardPage.selectPulseFromMenu();
        
        // Verify we're on the Pulse section
        await expect(page.locator("//span[normalize-space()='Vantage Pulse']")).toBeVisible();
    });

    test("Clicks the Create button", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        
        await dashboardPage.createSurvey();
        
        // Verify Create button was clicked
        await expect(page.locator("//span[normalize-space()='Create']")).toBeVisible();
    });

    test("Initiates survey creation", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        
        // Verify survey creation process started
        await expect(page.locator("(//label[@for='Recognition'])[1]")).toBeVisible();
    });

    test("Handles the survey name popup", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        
        await dashboardPage.handleSurveyNamePopup();
        
        const randomSurveyName = generateRandomSurveyName();
        await dashboardPage.addSurveyName(randomSurveyName);
        
        // Verify survey name was added
        await expect(page.locator("//input[@id='inputfield-5p930n']")).toHaveValue(randomSurveyName);
    });

    test("Completes survey scheduling - adding date and time", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        await dashboardPage.handleSurveyNamePopup();
        
        const randomSurveyName = generateRandomSurveyName();
        await dashboardPage.addSurveyName(randomSurveyName);
        
        await dashboardPage.scheduleSurvey("12-09-2024", "06:30");
        
        // Verify scheduling was completed
        await expect(page.locator("(//input[@id='mat-input-0'])[1]")).toHaveValue("12-09-2024");
    });

    test("Completes Frequency", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        await dashboardPage.handleSurveyNamePopup();
        
        const randomSurveyName = generateRandomSurveyName();
        await dashboardPage.addSurveyName(randomSurveyName);
        await dashboardPage.scheduleSurvey("12-09-2024", "06:30");
        
        await dashboardPage.selectFrequency();
        
        // Verify frequency selection was completed
        await expect(page.locator("(//input[@id='mat-radio-2-input'])[1]")).toBeChecked();
    });

    test("Selecting Next from Audience page", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        await dashboardPage.handleSurveyNamePopup();
        
        const randomSurveyName = generateRandomSurveyName();
        await dashboardPage.addSurveyName(randomSurveyName);
        await dashboardPage.scheduleSurvey("12-09-2024", "06:30");
        await dashboardPage.selectFrequency();
        
        await dashboardPage.selectAudience();
        
        // Verify audience selection was completed
        await expect(page.locator("(//button[@type='submit'][normalize-space()='Next'])[3]")).toBeVisible();
    });

    test("Selecting Next from Email page", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        await dashboardPage.handleSurveyNamePopup();
        
        const randomSurveyName = generateRandomSurveyName();
        await dashboardPage.addSurveyName(randomSurveyName);
        await dashboardPage.scheduleSurvey("12-09-2024", "06:30");
        await dashboardPage.selectFrequency();
        await dashboardPage.selectAudience();
        
        await dashboardPage.selectEmail();
        
        // Verify email selection was completed
        await expect(page.locator("(//button[@type='submit'][normalize-space()='Next'])[4]")).toBeVisible();
    });

    test("Survey Preview and Launch Survey", async ({ page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");
        await loginPage.handleRedeemPopup();
        await loginPage.clickHome();
        await loginPage.clickProfile();
        await loginPage.clickAdminDashboard();
        await loginPage.switchToDashboardWindow();
        await dashboardPage.selectPulseFromMenu();
        await dashboardPage.createSurvey();
        await dashboardPage.clickCreateSurvey();
        await dashboardPage.selectSurveyCategories();
        await dashboardPage.handleSurveyNamePopup();
        
        const randomSurveyName = generateRandomSurveyName();
        await dashboardPage.addSurveyName(randomSurveyName);
        await dashboardPage.scheduleSurvey("12-09-2024", "06:30");
        await dashboardPage.selectFrequency();
        await dashboardPage.selectAudience();
        await dashboardPage.selectEmail();
        
        await dashboardPage.launchSurvey();
        
        // Verify survey was launched
        await expect(page.locator("(//button[normalize-space()='Launch Survey'])[1]")).toBeVisible();
    });
});
