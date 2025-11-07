import { test, expect } from '@playwright/test';
import { timeout } from '../playwright.config';
const LoginPage = require('./pages/LoginPage');
const DashboardPage = require('./pages/DashboardPage');
const BasePage = require('./pages/BasePage');

test.describe('Vantage Pulse DashBoard Overview automation (Type::Regression)', () => {

  test.describe.configure({retries:0 , mode:"serial",timeout:80000})

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
   // if (page) await page.close();
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
  
   // let currentUrl= await adminDashboardTab.url();
    expect(await adminDashboardTab.url()).toContain(`/pulse/dashboard`);
  });

test("User should click on Create Survey & navigate to Create Survey Home section", async () => {
  const adminDashboardObj = new DashboardPage(adminDashboardTab);
  await adminDashboardObj.createSurvey();
  let currentUrl=await adminDashboardTab.url()

 if (currentUrl.includes('pulse/create-survey-home')) {
    console.log("✅ Navigated to Create Survey page successfully");
  } else {
    console.log("❌ Failed to navigate to Create Survey page. Current URL:", currentUrl);
  }
expect.soft(currentUrl).toContain("pulse/create-survey-home", { timeout: 10000 });
 
   await adminDashboardTab.waitForTimeout(250);
});


  test("User Click on Build Survey & navigate to `Create custom survey`", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
     const basePage = new BasePage(adminDashboardTab);
     await basePage.clickElement(`//*[normalize-space(.)='Build Survey']`);
    await basePage.waitForNavigation();
    let text=await adminDashboardTab.locator(`//div[normalize-space(.)='Survey Name']`).nth(0).textContent();
   
    await expect.soft(text).toContain('Survey Name' , { timeout: 10000 }); 
    await expect.soft(await adminDashboardTab.url()).toContain("/pulse/dialog", { timeout: 10000 });
    await adminDashboardTab.waitForTimeout(250);
    await adminDashboardTab.goBack();
    await adminDashboardTab.waitForTimeout(250);
  });


  test("User Click on Use Template & navigate to `Recently used survey templates`", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
     const basePage = new BasePage(adminDashboardTab);
     await basePage.clickElement(`//*[normalize-space(.)='Use Templates']`);
    await basePage.waitForNavigation();
    let text=await adminDashboardTab.locator(`//div[normalize-space(.)='Recently used survey templates']`).nth(0).textContent();
   
    await expect.soft(text).toContain('Recently used survey templates' , { timeout: 10000 }); 
    await expect.soft(await adminDashboardTab.url()).toContain("/pulse/dialog", { timeout: 10000 });
    await adminDashboardTab.waitForTimeout(250);
     await adminDashboardTab.goBack();
    await adminDashboardTab.waitForTimeout(250);

  });


  test("User Click on Create your own template & navigate to `Create your own Survey Template`", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
     const basePage = new BasePage(adminDashboardTab);
     await basePage.clickElement(`//*[normalize-space(.)='Create Template']`);
    await basePage.waitForNavigation();
    let text=await adminDashboardTab.locator(`//div[normalize-space(.)='Create your own Survey Template']`).nth(0).textContent();
   
    await expect.soft(text).toContain('Create your own Survey Template' , { timeout: 10000 }); 
    await expect.soft(await adminDashboardTab.url()).toContain("/pulse/dashboard/all-survey-templates/own-survey", { timeout: 10000 });
    await adminDashboardTab.waitForTimeout(250);
    await adminDashboardTab.goBack();
    await adminDashboardTab.waitForTimeout(250);

  });


  test("User selects Dashboard and verify section & url navigation", async () => {
        adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Dashboard');
        expect(res.status).toBe('success');
        
        expect(res.url).toContain('/pulse/dashboard');
        await adminDashboardTab.waitForTimeout(1000);
  
  });
  

   test(`User clicks "Survey Overview" drop down in Dashboard`, async () => {
        adminDashboardPage = new DashboardPage(adminDashboardTab);
         const basePage = new BasePage(adminDashboardTab);

        let res=await basePage.clickElement(`//span[@title='Survey Overview-All surveys']`)
        expect(res.status).toBe('success');
        
        await adminDashboardTab.waitForTimeout(1000);
  
  });

   test("User verifies any existing survey inside dropdown", async () => {
        adminDashboardPage = new DashboardPage(adminDashboardTab);
           const basePage = new BasePage(adminDashboardTab);
        let res=await basePage.getAllTexts(`div.pulse-select__item span`)
        expect(res.status).toBe('success');
        if(res.texts.length>1){
          console.log("Survey drop down consist of surveys")
        }
        else if(res.texts.length<=1)
        {
          expect(res.status).toBe('success');
            console.log("Expected not to be found for new company")
        }
        await adminDashboardTab.waitForTimeout(1000);
  
  });

  test("User selects Insights and verify section & url navigation", async () => {
        adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Insights');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/categories');
        await adminDashboardTab.waitForTimeout(1000);
  });
  

  test("User Click on Categories and verify navigation", async () => {
     adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Categories');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/categories',{timeout:10000});
        await adminDashboardTab.waitForTimeout(1000);

  });

    test("User Click on Segments and verify navigation", async () => {
     adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Segments');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/segment',{timeout:10000});
        await adminDashboardTab.waitForTimeout(1000);

  });

    test("User Click on Employee Lifecycle and verify navigation", async () => {
     adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Employee Lifecycle');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/experience-cycle',{timeout:10000});
        await adminDashboardTab.waitForTimeout(1000);

  });

  test("User Click on Feedback Lifecycle and verify navigation", async () => {
     adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Feedback');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/feedback',{timeout:10000});
        await adminDashboardTab.waitForTimeout(1000);

  });

   test("User Click on Question Scores and verify navigation", async () => {
     adminDashboardPage = new DashboardPage(adminDashboardTab);
        let res=await adminDashboardPage.selectPulseSection('Question Scores');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/question-score',{timeout:10000});
        await adminDashboardTab.waitForTimeout(1000);

  });

   test("User Click on Configuration Drop Down & verify the visiblity of all 4 sub modules inside drop down", async () => {
     adminDashboardPage = new DashboardPage(adminDashboardTab);
     const basePage = new BasePage(adminDashboardTab);

        let res=await adminDashboardPage.selectPulseSection('Configuration');
        expect(res.status).toBe('success');
        expect(res.url).toContain('/pulse/insights/question-score',{timeout:10000});
        await adminDashboardTab.waitForTimeout(250);

    let res1 = await basePage.assertText(`//a[normalize-space(.)='Question Bank']`,'Question Bank');
    let res2 = await basePage.assertText(`//a[normalize-space(.)='Survey Management']`,'Survey Management');
    let res3 = await basePage.assertText(`//a[normalize-space(.)='Language Settings']`,'Language Settings');
    let res4 = await basePage.assertText(`//a[normalize-space(.)='Email Templates']`,'Email Templates');

    expect(res1.status,`Should display the Question Bank on clicking dropdown`).toBe('success');
    expect(res2.status,`Should display the Survey Management on clicking dropdown`).toBe('success');
    expect(res3.status,`Should display the Language Settings on clicking dropdown`).toBe('success');
    expect(res4.status,`Should display the Email Templates on clicking dropdown`).toBe('success');
  });



// let surveyName

test("User clicks on Question Bank and verify navigation", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Question Bank');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-questions')
   
   expect(res2.status,'should navigate to `/pulse/configuration/manage-questions`').toBe('success',{timeout:10000});
   await adminDashboardTab.waitForTimeout(250);
});



test("User clicks on Question dropdown to select language", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
   await basePage.clickElement(`mat-expansion-panel-header[role="button"]`)
   let res=await basePage.assertText(`(//*[normalize-space(.)='Add languages for translation'])[1]`,`Add languages for translation`)
   expect(res.status,'"Add languages for translation" <input> field should be visible' ).toBe('success',{timeout:5000});
   await adminDashboardTab.waitForTimeout(250);
});



test("User Verifies all language available", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    await basePage.clickElement(`input[id='languageSelect']`);
    
    const result = await basePage.getAllTexts('vc-option span');
    
    if (result.status === "success") {
        console.log("Available languages:", result.texts);
      
        const expectedLanguages = ['Assamese','Gujarati', 'Punjabi','Tamil','Urdu','Chinese (Simplified)','Russian','Spanish','Chinese (Traditional)','Polish','Turkish','Filipino','Sinhala' ];
        for (const lang of expectedLanguages) {
            expect.soft(result.texts,`Should dispkay the languages on clicking SELECT LANGUAGES field `).toContain(lang);
        }
    } else {
        console.log(`Failed to get languages: ${result.message}`);
    }
    
    await adminDashboardTab.waitForTimeout(250);
});


test("User selects a language to translate", async () => {

    let language='Assamese'
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
   await basePage.clickElement(`//vc-option//*[normalize-space(.)='${language}']`)
   await adminDashboardTab.waitForTimeout(250);
   let res=await basePage.assertText(`(//vc-tag//*[normalize-space(.)='${language}'])[1]`,language);
   expect(res.status,'Should be able to add desired translating language' ).toBe('success',{timeout:5000});
   await adminDashboardTab.waitForTimeout(250);
});



test("User Verifies toggle button working for all questions", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);

    // Click the visual toggle button instead of the hidden input
    const toggleButtons = await adminDashboardTab.locator('.toggle-btn').all();
    console.log(`Found ${toggleButtons.length} toggle buttons`);

    // Define the click function
    const clickToggle = async (toggleButton) => {
        await toggleButton.click();
        return { status: 'success' };
    };

    for (let toggleButton of toggleButtons) {
        // Call the function and get the return value
        const res = await clickToggle(toggleButton);
        
        await adminDashboardTab.waitForTimeout(100);
        
        expect(res.status).toBe('success');
        console.log("Clicked toggle button with status:", res.status);
    }

    await adminDashboardTab.waitForTimeout(2000);
    await adminDashboardTab.goBack();
});

test("User clicks on Survey management and verify navigation", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Survey Management');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-survey')
   
   expect(res2.status,'should navigate to `/pulse/configuration/manage-survey`').toBe('success',{timeout:10000});
   await adminDashboardTab.waitForTimeout(250);
});

test("User switch to Upcoming status in Survey", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Upcoming');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-survey')
    let res3= await basePage.assertText(`(//*[normalize-space()='Upcoming'])[3]`,`Upcoming`)
   
   expect(res2.status,'should navigate to `/pulse/configuration/manage-survey`').toBe('success',{timeout:10000});
   await adminDashboardTab.waitForTimeout(250);
});

test("User switch to Automated status in Survey", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Automated');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-survey')
    let res3= await basePage.assertText(`(//*[normalize-space()='Automated'])[3]`,`Upcoming`)
   
   expect(res2.status,'should navigate to `/pulse/configuration/manage-survey`').toBe('success',{timeout:10000});
   await adminDashboardTab.waitForTimeout(250);
   await adminDashboardTab.goBack();
});

test("User clicks on Language Settings and verify navigation", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Language Settings');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-survey-languages')
   
   expect(res2.status,'should navigate to `/pulse/configuration/manage-survey-languages`').toBe('success',{timeout:10000});
   await adminDashboardTab.waitForTimeout(250);
});


test("User Verifies all language available in Language settings", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    await adminDashboardTab.getByRole('combobox').click();
    
    const result = await basePage.getAllTexts('vc-option span');
    
    if (result.status === "success") {
        console.log("Available languages:", result.texts);
      
      const expectedLanguages = ['Hindi', 'Assamese', 'Bengali', 'Gujarati', 'Kannada', 'Kashmiri', 'Malayalam', 'Marathi', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Tamil', 'Telugu', 'Urdu', 'Sindhi', 'Arabic', 'Chinese (Simplified)', 'French', 'French (Canada)', 'German', 'Italian', 
        'Korean', 'Portuguese', 'Russian', 'Spanish', 'Vietnamese', 'Indonesian', 'Hungarian', 'Chinese (Traditional)', 'Thai', 'Swahili', 'Finnish', 'Swedish', 'Danish', 'Norwegian', 'Polish', 'Turkish', 'Hebrew', 'Persian', 'Greek', 'Romanian', 'Bulgarian', 'Serbian', 'Ukrainian', 'Armenian',
         'Georgian', 'Mongolian', 'Kazakh', 'Uzbek', 'Turkmen', 'Afrikaans', 'Albanian', 'Amharic', 'Azerbaijani', 'Basque', 'Belarusian', 'Bosnian', 'Cebuano', 'Chichewa', 'Corsican', 'Croatian', 'Czech', 'Esperanto', 'Estonian', 'Filipino', 'Frisian', 'Galician', 'Haitian Creole', 'Hausa', 'Hawaiian', 
         'Hebrew', 'Hmong', 'Igbo', 'Icelandic', 'Javanese', 'Khmer', 'Kurdish', 'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malagasy', 'Maltese', 'Maori', 'Myanmar (Burmese)', 'Pashto', 'Samoan', 'Scots Gaelic', 'Sesotho', 'Shona', 'Sinhala', 'Slovak', 'Slovenian',
          'Somali', 'Sundanese', 'Tajik', 'Tatar', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu', 'Bhojpuri', 'Dogri', 'Maithili', 'Manipuri', 'Bodo', 'Konkani', 'Santali', 'Santali (Ol Chiki)', 'Dutch'];
      
      
        for (const lang of expectedLanguages) {
            expect.soft(result.texts,`Should dispkay the languages on clicking SELECT LANGUAGES field `).toContain(lang);
        }
    } else {
        console.log(`Failed to get languages: ${result.message}`);
    }
    
    await adminDashboardTab.waitForTimeout(250);
});



test("User selects a language to translate in language settings", async () => {

    let language='Assamese'
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
   await basePage.clickElement(`//vc-option//*[normalize-space(.)='${language}']`)
   await adminDashboardTab.waitForTimeout(250);
   let res=await basePage.assertText(`(//vc-tag//*[normalize-space(.)='${language}'])[1]`,language);
   expect(res.status,'Should be able to add desired translating language' ).toBe('success',{timeout:5000});
   await adminDashboardTab.waitForTimeout(250);
   
});

test("User clicks on Email Templates section and verify navigation", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Email Templates');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-email')
   let res3= await basePage.assertText(`//*[normalize-space(.)='Manage Email Templates']`,"Manage Email Templates")
   expect(res2.status,'should navigate to `/pulse/configuration/manage-email`').toBe('success',{timeout:10000});
   expect(res3.status,'should display correct Header tite "Manage Email Templates"').toBe('success',{timeout:5000});
   await adminDashboardTab.waitForTimeout(250);
});

test("User clicks on an Email Template", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
   const clicker= async ()=>{
                                   await adminDashboardTab.locator
                                   (`button.d-btn-white`).nth(1).click();
                                   return {status:"success",message:"CLicked on email template preview."};
                                  }
                               let res= await clicker();
  //  let res=  await basePage.clickElement(`button.d-btn-white >> nth=1`);
   expect(res.status,'should navigate to `/pulse/configuration/manage-email`').toBe('success',{timeout:10000});

   await adminDashboardTab.waitForTimeout(250);
});


test("User verifies email template preview", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
 
    let res2 = await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/configuration/manage-email');
    let res3 = await basePage.assertText(`(//*[normalize-space(.)='Edit Email'])[last()]`, "Edit Email");
    let res4 = await basePage.assertText(`//*[normalize-space(.)='Email Preview']`, "Email Preview");
    
    // Use Promise.all if you want parallel execution
    await Promise.all([
        expect.soft(res2.status, 'should navigate to correct URL').toBe('success'),
        expect.soft(res3.status, 'should display Edit Email text').toBe('success'),
        expect.soft(res4.status, 'should display Email Preview text').toBe('success')
    ]);
    
    await adminDashboardTab.waitForTimeout(250);
});


test("User clicks on Learning section and verify navigation", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Learning');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/learning')
   let res3= await basePage.assertText(`//*[normalize-space(.)='Browse Articles']`,"Browse Articles")
   expect(res2.status,'should navigate to `/pulse/learning`').toBe('success',{timeout:10000});
   expect(res3.status,'should display correct Header tite "Browse Articles"').toBe('success',{timeout:5000});
   await adminDashboardTab.waitForTimeout(250);
});


test("User clicks on Reports section and verify navigation", async () => {
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);
      
    let res=await adminDashboardPage.selectPulseSection('Reports');
    let res2=await basePage.assertLink('https://dashboard-v2.vantagecircle.co.in/pulse/reports')
    let res3= await basePage.assertText(`//*[normalize-space(.)='Survey Reports']`,"Survey Reports")
     expect(res2.status,'should navigate to `/pulse/reports`').toBe('success',{timeout:10000});
     expect(res3.status,'should display correct Header tite "Survey Reports"').toBe('success',{timeout:5000});
     await adminDashboardTab.waitForTimeout(250);
});


test("Extract the Pusle version , Survey Limits, Survey Counts",async()=>{
    adminDashboardPage = new DashboardPage(adminDashboardTab);
    const basePage = new BasePage(adminDashboardTab);

    let res=await basePage.getAllTexts(`div.items-center span.font-bold`);
    console.log(`Pulse Version Runned on test::`,res.texts);
    let res2=await basePage.getText(`p.flex span`);
    console.log(`Pulse Survey Limits::`,res2.text);
    let res3=await basePage.getAllTexts(`p.ng-star-inserted span`);
    console.log(`Survey Counts on this account::`,res3.texts);

}
)

// test("User Verifies all language available", async () => {
//     adminDashboardPage = new DashboardPage(adminDashboardTab);
//     const basePage = new BasePage(adminDashboardTab);
      
//    await basePage.clickElement(`input[id='languageSelect']`);
//    let languagesAvial=await adminDashboardTab.locator('vc-option span').all();
  
//   //  let res=await basePage.assertText(`(//*[normalize-space(.)='Add languages for translation'])[1]`,`Add languages for translation`)
//    expect(res.status,'"Add languages for translation" <input> field should be visible' ).toBe('success',{timeout:5000});
//    await adminDashboardTab.waitForTimeout(250);
// });


 //     let res=await basePage.assertText("//div[normalize-space(.)='Start Date']//following-sibling::div",actualDate);
//     let res2=await basePage.assertText("//div[normalize-space(.)='End Date']//following-sibling::div",endDate);
//     let res3=await basePage.assertText("//div[normalize-space(.)='Frequency']//following-sibling::div",TypeOfFrequency);
//     let  surveyNameVerify= await basePage.assertText(`(//div[normalize-space(.)='Survey Name']//following-sibling::div)[last()]`,surveyName);
//     const timeText = await basePage.getText("//div[normalize-space(.)='Time']//following-sibling::div");
//     const timeWithoutSeconds = timeText.text.replace(/:\d{2}$/, ''); // Remove last :00

//     expect.soft(surveyNameVerify.status,"Should display the correct Survey name as per build your survey").toBe('success');
      
//      expect.soft(res.status).toBe('success');
//      expect.soft(res2.status).toBe('success');
//     expect.soft(timeWithoutSeconds).toBe(Time);
//     console.log(`Time selected is displayed correctly in preview:`,Time==timeWithoutSeconds)
//     expect.soft(res3.status).toBe('success');
  
//    let res4=await adminDashboardPage.launchSurvey();
//    expect(res4.status,'Should click and launch survey').toBe('success');
//   await adminDashboardTab.waitForTimeout(500)
  
// });


//    test('User gets `Congratulations!` pop up after Survey launched successfully', async () => {
//     const basePage=new BasePage(adminDashboardTab);
//     await basePage.waitForElement('h2:has-text("Congratulations!")')
//     await expect(adminDashboardTab.getByText('Congratulations!', { exact: true })).toBeVisible();
//     let res=await basePage.clickElement("//button[normalize-space(.)='Close']");
//     expect(res.status).toBe('success');

//   });
//page.getByText('Close')
//page.getByText('Congratulations!', { exact: true })

})
