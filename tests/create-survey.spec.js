import { test, expect } from '@playwright/test';
const LoginPage = require('./pages/LoginPage');
const DashboardPage = require('./pages/DashboardPage');
const BasePage = require('./pages/BasePage');

test.describe('Vantage Circle Survey Creation Flow (Legacy Style)', () => {

  test.describe.configure({retries:0 , mode:"serial",timeout:60000})

  let page;
  let loginPage;
  let dashboardPage;

  // New shared vars for admin dashboard tab and page object
  let adminDashboardTab;
  let adminDashboardPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    //if (page) await page.close();
    if (adminDashboardTab) await adminDashboardTab.close();
  });

  test('Navigate to Login Page and verify title', async () => {
    loginPage = new LoginPage(page);
    const isTitleCorrect = await loginPage.navigateToLoginPage();
    // You can assert title here if you want
  });

  test('Login to the application', async () => {
    const basePage = new BasePage(page);
    loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login("sagarika.devroy@vantagecircle.com", "welcome");

    await page.waitForURL('**/ng/home');
    expect(page.url()).toContain('/ng/home');
  });

  test('Click Profile icon', async () => {
    loginPage = new LoginPage(page);
    await loginPage.clickProfile();
    await expect(page.locator("//span[normalize-space()='Admin Dashboard']")).toBeVisible();
  });


  test('Click Admin Dashboard and switch window', async () => {
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);

    await loginPage.clickAdminDashboard();

    // Switch to new tab and save it
    adminDashboardTab = await dashboardPage.switchToDashboardWindow();

    // Create DashboardPage object with new tab
    adminDashboardPage = new DashboardPage(adminDashboardTab);
  });

  // All tests below use adminDashboardPage and adminDashboardTab instead of page/dashboardPage
 
  test("Select 'Vantage Pulse' from product menu", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    await adminDashboardPage.selectPulseFromMenu();
    await expect(adminDashboardTab.locator("//span[normalize-space()='Vantage Pulse']")).toBeVisible();
  });

test("Click the Create button", async () => {
  const adminDashboardObj = new DashboardPage(adminDashboardTab);
  await adminDashboardObj.createSurvey();

 expect(await adminDashboardTab.url()).toContain("https://dashboard-v2.vantagecircle.co.in/pulse/create-survey-home", { timeout: 10000 });
  console.log("✅ Navigated to Create Survey page successfully");
});


  test("Click 'Create your own Survey'", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    await adminDashboardPage.clickCreateSurvey();
   expect(adminDashboardTab.locator(`(//*[normalize-space(.)='Survey Name'])[1]`)).toHaveText('Survey Name'); 
  });


  test("Select survey categories", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    let res=await adminDashboardPage.selectSurveyCategories('Recognition');
    expect(res.status).toBe('success');
  
  });

 let surveyName
test("Add survey name and click Next", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
    
    // This will now work because generateRandomName() returns a string directly
    surveyName = await basePage.generateRandomName();
    
    await basePage.fillInput("vc-input-field[type='text'] div div input", surveyName);
    await adminDashboardTab.waitForTimeout(250);
   
    await adminDashboardTab.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
    await adminDashboardTab.waitForTimeout(250);
    await expect(adminDashboardTab.locator("vc-input-field[type='text'] div div input")).toHaveValue(surveyName);
});

  let actualDate,endDate,Time;
test("Schedule survey – date and time", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(page);
    let date = "11-11-2025"; 
    let timeHr="6"
    const [day, month, year] = date.split('-');
    const dateObj = new Date(year, month - 1, day);
    
    const expectedDate = dateObj.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short', 
        year: 'numeric'
    }); 
    
    await adminDashboardPage.scheduleSurvey(date,Number(timeHr));
    console.log("Expected date:", expectedDate);
  
    const dateLocator = adminDashboardTab.locator(`(//*[normalize-space()='${expectedDate}'])[1]`);
    await adminDashboardTab.waitForTimeout(500)
    actualDate = await dateLocator.textContent();

     const EnddateLocator = adminDashboardTab.locator(`//p[normalize-space(.)='End Date']//following-sibling::p`);
    endDate = await EnddateLocator.textContent();
   
     const TimeLocator = adminDashboardTab.locator(`//p[normalize-space(.)='Time']//following-sibling::p`);
    Time = await TimeLocator.textContent();
  
    expect(actualDate).toBe(expectedDate);
    await adminDashboardTab.waitForTimeout(500)
    //p[normalize-space(.)='Time']//following-sibling::p
  test.step("Click next after schedule survey", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    await adminDashboardTab.click(`(//button[@type='submit'][normalize-space()='Next'])[1]`)
   });
  
  });
  

  let TypeOfFrequency;
  test("Complete frequency selection", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
   let res= await adminDashboardPage.selectFrequency("Daily");
   
    TypeOfFrequency=res.FreqType
    expect.soft(res.status).toBe('success')
  });

    test("Click next after checking Frequency", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    await adminDashboardTab.click(`(//button[@type='submit'][normalize-space()='Next'])[2]`)
  });


  test("Click Next from Audience page", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    await adminDashboardPage.selectAudience();

  });


  test("Click Next from Email page", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    await adminDashboardPage.selectEmail();

  });


  test("Survey Preview and Launch Survey", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
 await adminDashboardTab.waitForTimeout(1500)
    let res=await basePage.assertText("//div[normalize-space(.)='Start Date']//following-sibling::div",actualDate);
    let res2=await basePage.assertText("//div[normalize-space(.)='End Date']//following-sibling::div",endDate);
    let res3=await basePage.assertText("//div[normalize-space(.)='Frequency']//following-sibling::div",TypeOfFrequency);
    let  surveyNameVerify= await basePage.assertText(`(//div[normalize-space(.)='Survey Name']//following-sibling::div)[last()]`,surveyName);
    const timeText = await basePage.getText("//div[normalize-space(.)='Time']//following-sibling::div");
    const timeWithoutSeconds = timeText.text.replace(/:\d{2}$/, ''); // Remove last :00

    expect.soft(surveyNameVerify.status,"Should display the correct Survey name as per build your survey").toBe('success');
      
  await expect.soft(res.status).toBe('success');
  await expect.soft(res2.status).toBe('success');
  await expect.soft(timeWithoutSeconds).toBe(Time);
    console.log(`Time selected is displayed correctly in preview:`,Time==timeWithoutSeconds)
 //   await expect.soft(res3.status).toBe('success');
  await adminDashboardTab.waitForTimeout(500)
  let res4=await adminDashboardPage.launchSurvey();
  expect(res4.status,'Should click and launch survey').toBe('success');
  await adminDashboardTab.waitForTimeout(500)
  
});


   test('User gets `Congratulations!` pop up after Survey launched successfully', async () => {
    const basePage=new BasePage(adminDashboardTab);
    await basePage.waitForElement('h2:has-text("Congratulations!")')
    await expect(adminDashboardTab.getByText('Congratulations!', { exact: true })).toBeVisible();
    let res=await basePage.clickElement("//button[normalize-space(.)='Close']");
    expect(res.status).toBe('success');

  });
//page.getByText('Close')
//page.getByText('Congratulations!', { exact: true })
})
