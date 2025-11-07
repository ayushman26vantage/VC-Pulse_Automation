// const { timeout } = require('../../playwright.config');
// const BasePage = require('./BasePage');

// class DashboardPage extends BasePage {
//     constructor(page) {
//         super(page);
//     }

//     async accessDashboard() {
//         // Wait for and click the dashboard button
//         await this.waitForElement("//button[normalize-space()='Access your dashboard']", 10000);
//         await this.page.click("//button[normalize-space()='Access your dashboard']");
        
//         // Wait for new window to open
//         const [newPage] = await Promise.all([
//             this.page.context().waitForEvent('page'),
//             // The click action that triggers the new window
//         ]);
        
//         // Switch to the new page
//         this.page = newPage;
        
//         // Wait for the page to load
//         await this.page.waitForLoadState('networkidle');
        
//         // Get the title and verify
//         const title = await this.page.title();
//         return title === "Vantage Circle | Dashboard";
//     }

   
//     async createSurvey() {
//         // Wait for and click the Create button
//         await this.waitForElement("//*[normalize-space(.)='Create Survey']");
//         await this.page.click("//*[normalize-space(.)='Create Survey']");
        
//         // Wait for any animations or transitions
//         await this.page.waitForTimeout(500);
//     }

   


//     async switchToDashboardWindow() {
//   const pages = this.page.context().pages();

//   if (pages.length >= 2) {
//     const newPage = pages.find(p => p !== this.page); // Avoid using index
//     await newPage.waitForLoadState('load');
//     console.log('Switched to tab with title:', await newPage.title());
//     return newPage; // Return the new tab
//   }

//   throw new Error("Dashboard window not found");
// }

//     async selectPulseFromMenu() {
//         // Click on product menu dropdown
//         await this.waitForElement("//button[@data-collapsed='true']");
//         await this.page.click("//button[@data-collapsed='true']");
//         await this.page.waitForTimeout(250);

//         // Select Vantage Pulse
//         await this.waitForElement("//span[normalize-space()='Vantage Pulse']");
//         await this.page.click("//span[normalize-space()='Vantage Pulse']");
//         await this.page.waitForTimeout(2500);
//     }

//     async clickCreateSurvey() {
//         // Click on Create Survey button
//         await this.waitForElement("//*[normalize-space(.)='Build Survey']");
//         await this.page.click("//*[normalize-space(.)='Build Survey']");
//         await this.page.waitForTimeout(250);
//     }

//     async selectSurveyCategories(locator) {
//        //let BaseObj= new BasePage(this.page);
//         // Select Recognition
//         await this.waitForElement(`//*[normalize-space(.)='(11)']//parent::*[contains(text(), '${locator}')]`);
//        // await this.page.click("(//label[@for='Recognition'])[1]");
//          BaseObj.clickElement
//         // Select Engagement
//         await this.waitForElement("(//label[@for='Engagement'])[1]");
//         await this.page.click("(//label[@for='Engagement'])[1]");

//         await this.page.waitForTimeout(1000);

//         // Click Next
//         await this.waitForElement("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
//         await this.page.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
//         await this.page.waitForTimeout(4000);
//     }

//     async addSurveyName(surveyName) {
//         // Wait for input field and add survey name
//         await this.waitForElement("//input[@id='inputfield-5p930n']");
//         await this.page.fill("//input[@id='inputfield-5p930n']", surveyName);
//         await this.page.waitForTimeout(3000);

//         // Click Next
//         await this.waitForElement("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
//         await this.page.click("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
//         await this.page.waitForTimeout(2000);
//     }

//     async handleSurveyNamePopup() {
//         // Wait for popup to appear
//         await this.waitForElement("#swal2-title", 10000);
        
//         // Verify popup title
//         const popupTitle = await this.page.textContent("#swal2-title");
//         if (popupTitle !== "Please add Survey Name") {
//             throw new Error(`Expected popup title "Please add Survey Name", but got "${popupTitle}"`);
//         }

//         await this.page.waitForTimeout(4000);

//         // Click OK button
//         await this.waitForElement("(//div[@class='swal2-actions'])[1]");
//         await this.page.click("(//div[@class='swal2-actions'])[1]");
//         await this.page.waitForTimeout(2000);
//     }

//     async scheduleSurvey(date, time) {
//         // Set date
//         await this.waitForElement("(//input[@id='mat-input-0'])[1]");
//         await this.page.fill("(//input[@id='mat-input-0'])[1]", date);
//         await this.page.waitForTimeout(2000);

//         // Set time
//         await this.waitForElement("(//input[@aria-label='24hr format'])[1]");
//         await this.page.fill("(//input[@aria-label='24hr format'])[1]", time);
//         await this.page.waitForTimeout(2000);

//         // Click Details
//         await this.waitForElement("(//div[@class='flex item-center justify-center w-[100%]'])[1]");
//         await this.page.click("(//div[@class='flex item-center justify-center w-[100%]'])[1]");
//         await this.page.waitForTimeout(1000);

//         // Click Next on scheduling page
//         await this.waitForElement("(//i[@class='vc-arrow-right ml-1 text-[10px]'])[2]");
//         await this.scrollToElement("(//i[@class='vc-arrow-right ml-1 text-[10px]'])[2]");
//         await this.page.click("(//i[@class='vc-arrow-right ml-1 text-[10px]'])[2]");
//         await this.page.waitForTimeout(1000);
//     }

//     async selectFrequency() {
//         // Select Daily
//         await this.waitForElement("(//input[@id='mat-radio-2-input'])[1]");
//         await this.page.click("(//input[@id='mat-radio-2-input'])[1]");
//         await this.page.waitForTimeout(2000);

//         // Click Next
//         await this.waitForElement("(//button[@type='submit'][normalize-space()='Next'])[2]");
//         await this.scrollToElement("(//button[@type='submit'][normalize-space()='Next'])[2]");
//         await this.page.click("(//button[@type='submit'][normalize-space()='Next'])[2]");
//         await this.page.waitForTimeout(3000);
//     }

//     async selectAudience() {
//         // Click Next from Audience page
//         await this.waitForElement("(//button[@type='submit'][normalize-space()='Next'])[3]");
//         await this.page.click("(//button[@type='submit'][normalize-space()='Next'])[3]");
//         await this.page.waitForTimeout(2000);
//     }

//     async selectEmail() {
//         // Click Next from Email page
//         await this.waitForElement("(//button[@type='submit'][normalize-space()='Next'])[4]");
//         await this.scrollToElement("(//button[@type='submit'][normalize-space()='Next'])[4]");
//         await this.page.click("(//button[@type='submit'][normalize-space()='Next'])[4]");
//         await this.page.waitForTimeout(2000);
//     }

//     async launchSurvey() {
//         // Click Launch Survey
//         await this.waitForElement("(//button[normalize-space()='Launch Survey'])[1]");
//         await this.scrollToElement("(//button[normalize-space()='Launch Survey'])[1]");
//         await this.page.click("(//button[normalize-space()='Launch Survey'])[1]");
//         await this.page.waitForTimeout(9000);
//     }

//     async useExistingSurvey(templateIndex = 3) {
//         // Hover over element to show template options
//         const elementToHover = await this.page.locator('(//div)[186]');
//         await elementToHover.scrollIntoViewIfNeeded();
//         await elementToHover.hover();
//         await this.page.waitForTimeout(1000);

//         // Click Use Template button
//         await this.waitForElement(`(//button[contains(text(),'Use Template')])[${templateIndex}]`);
//         await this.page.click(`(//button[contains(text(),'Use Template')])[${templateIndex}]`);
//         await this.page.waitForTimeout(8000);
//     }
// }

// module.exports = DashboardPage;



const { timeout } = require('../../playwright.config');
const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async accessDashboard() {
        // Wait for and click the dashboard button using BasePage methods
        await this.waitForElement("//button[normalize-space()='Access your dashboard']", 10000);
        await this.clickElement("//button[normalize-space()='Access your dashboard']");
        
        // Wait for new window to open using BasePage method
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            // The click action that triggers the new window
        ]);
        
        // Switch to the new page
        this.page = newPage;
        
        // Wait for the page to load using BasePage method
        await this.waitForNavigation();
        
        // Get the title and verify using BasePage method
        const title = await this.getTitle();
        return title === "Vantage Circle | Dashboard";
    }

    async createSurvey() {
        // Wait for and click the Create button using BasePage methods
        await this.waitForElement("//*[normalize-space(.)='Create Survey']");
        await this.clickElement("//*[normalize-space(.)='Create Survey']");
        
        // Wait for any animations or transitions
        await this.page.waitForTimeout(500);
    }

    async switchToDashboardWindow() {
        const pages = this.page.context().pages();

        if (pages.length >= 2) {
            const newPage = pages.find(p => p !== this.page); // Avoid using index
            await newPage.waitForLoadState('load');
            console.log('Switched to tab with title:', await newPage.title());
            return newPage; // Return the new tab
        }

        throw new Error("Dashboard window not found");
    }

    async selectPulseFromMenu() {
        // Click on product menu dropdown using BasePage methods
        await this.waitForElement("//button[@data-collapsed='true']");
        await this.clickElement("//button[@data-collapsed='true']");
        await this.page.waitForTimeout(250);

        // Select Vantage Pulse using BasePage methods
        await this.waitForElement("//span[normalize-space()='Vantage Pulse']");
        await this.clickElement("//span[normalize-space()='Vantage Pulse']");
            await this.page.waitForURL(/.*\/pulse\/dashboard/);
        await this.page.waitForTimeout(250);
    }

    async clickCreateSurvey() {
        // Click on Create Survey button using BasePage methods
        await this.waitForElement("//*[normalize-space(.)='Build Survey']");
        await this.clickElement("//*[normalize-space(.)='Build Survey']");
        await this.page.waitForTimeout(2500);
    }

  async selectSurveyCategories(surveyname) {
    try {
        
        // Select Engagement by clicking its text
        await this.clickElement(`//label[@for='${surveyname}']`);
        
        await this.page.waitForTimeout(1000);

        // Click Next
        // await this.clickElement("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        
        return { status: "success" };
    } catch (error) {
        console.error(`Error: ${error}`);
        return { status: "failure", error: error.message };
    }
}

    async addSurveyName(surveyName) {
        // Wait for input field and add survey name using BasePage methods
        await this.waitForElement("//input[@id='inputfield-5p930n']");
        await this.fillInput("//input[@id='inputfield-5p930n']", surveyName);
        await this.page.waitForTimeout(3000);

        // Click Next using BasePage methods
        await this.waitForElement("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await this.clickElement("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]");
        await this.page.waitForTimeout(2000);
    }

    async handleSurveyNamePopup() {
        // Wait for popup to appear using BasePage method
        await this.waitForElement("#swal2-title", 10000);
        
        // Verify popup title using BasePage method
        const popupTitle = await this.getText("#swal2-title");
        if (popupTitle !== "Please add Survey Name") {
            throw new Error(`Expected popup title "Please add Survey Name", but got "${popupTitle}"`);
        }

        await this.page.waitForTimeout(4000);

        // Click OK button using BasePage method
        await this.waitForElement("(//div[@class='swal2-actions'])[1]");
        await this.clickElement("(//div[@class='swal2-actions'])[1]");
        await this.page.waitForTimeout(2000);
    }

    async scheduleSurvey(date,timeHr) {
        try{
        // Set date using BasePage methods
        await this.waitForElement("(//input[@id='mat-input-0'])[1]");
        await this.fillInput("(//input[@id='mat-input-0'])[1]", date);
        await this.page.waitForTimeout(2000);

        // Set time using BasePage methods
        await this.waitForElement("button[class$='ngx-material-timepicker-toggle']");
        await this.clickElement("button[class$='ngx-material-timepicker-toggle']");
        await this.page.waitForTimeout(500);
        await this.clickElement(`//div[@class="clock-face__number clock-face__number--outer ng-star-inserted"]/span[normalize-space()='${timeHr}']`);

        await this.clickElement("//span[normalize-space()='Ok']")
        return{ status:`success`,message:`Survey scheduling successful`}
    }catch(error){
        console.error(error)
        return{ status:`success`,message:`Survey scheduling failed`}
        }
    }
    async selectFrequency(FreqType) {
        try{
        await this.waitForElement(`//p[normalize-space()='${FreqType}']/parent::div/following-sibling::div//input[@type='radio']`);
        await this.clickElement(`//p[normalize-space()='${FreqType}']/parent::div/following-sibling::div//input[@type='radio']`);
        
       return{status:'success',message:`succcessfully clicked on checkbox for ${FreqType}`,FreqType}
        }catch(error){
            console.log(error)
            return{status:'failure',message:`failed to clicked on checkbox for ${FreqType}`}
        }
    }

    async selectAudience() {
        // Click Next from Audience page using BasePage methods
        await this.waitForElement("(//button[@type='submit'][normalize-space()='Next'])[3]");
        await this.clickElement("(//button[@type='submit'][normalize-space()='Next'])[3]");
        await this.page.waitForTimeout(2000);
    }
   

    async selectEmail() {
        // Click Next from Email page using BasePage methods
        await this.waitForElement("(//button[@type='submit'][normalize-space()='Next'])[4]");
        await this.scrollToElement("(//button[@type='submit'][normalize-space()='Next'])[4]");
        await this.clickElement("(//button[@type='submit'][normalize-space()='Next'])[4]");
        await this.page.waitForTimeout(2000);
    }

    async launchSurvey() {
        try{
        // Click Launch Survey using BasePage methods
        await this.waitForElement("(//button[normalize-space()='Launch Survey'])[1]");
        await this.scrollToElement("(//button[normalize-space()='Launch Survey'])[1]");
        await this.clickElement("(//button[normalize-space()='Launch Survey'])[1]");
         return{ status:'success' , message:'Successfully click on launch survey button'}
    }catch(error){
        console.error("Failed to launch survey");
        return{ status:'failure' , message:'Failed to click on launch survey button'}
    }
    }
    async useExistingSurvey(templateIndex = 3) {
        // Hover over element to show template options using BasePage method
        const elementToHover = await this.page.locator('(//div)[186]');
        await elementToHover.scrollIntoViewIfNeeded();
        await this.hoverElement('(//div)[186]');
        await this.page.waitForTimeout(1000);

        // Click Use Template button using BasePage methods
        await this.waitForElement(`(//button[contains(text(),'Use Template')])[${templateIndex}]`);
        await this.clickElement(`(//button[contains(text(),'Use Template')])[${templateIndex}]`);
        await this.page.waitForTimeout(8000);
    }

    // Additional utility methods that leverage BasePage functionality
    async waitForSurveyCreation() {
        await this.waitForText('Survey Created', 15000);
    }

    async verifySurveyInList(surveyName) {
        const surveyLocator = `//*[contains(normalize-space(.), '${surveyName}')]`;
        return await this.isVisible(surveyLocator);
    }

    async takeSurveyScreenshot(stepName) {
        await this.takeScreenshot(`survey-${stepName}`);
    }

    async waitForSurveyPageLoad() {
        await this.waitForNavigation();
        await this.waitForElement("//*[contains(text(), 'Survey')]", 10000);
    }

    // async Click_VerifyNavigation(locatorButton,locatorSection,urlRoute){

    //          await this.clickElement(locatorButton);
    //         await basePage.waitForNavigation();
    //         let text=await adminDashboardTab.locator(locatorSection).nth(0).textContent();
           
    //         await expect.soft(text).toContain('Survey Name' , { timeout: 10000 }); 
    //         await expect.soft(await adminDashboardTab.url()).toContain(urlRoute, { timeout: 10000 });
    //         await adminDashboardTab.waitForTimeout(250);
    //         await adminDashboardTab.goBack();
    //         await adminDashboardTab.waitForTimeout(250);
    // }

    async selectPulseSection(PulseSection) {
    
    try {
        await this.waitForElement(`//*[normalize-space(.)='${PulseSection}']`)
        await this.clickElement(`//*[normalize-space(.)='${PulseSection}']`);
        await this.page.waitForTimeout(1000);
       
       await this.waitForNavigation();
       let url= await this.page.url();
      
        return { status: "success", message: `successfully to switch to ${PulseSection}`, url};
    } catch (error) {
        console.error(`Error: ${error}`);
        return { status: "failure", message: `failed to switch to ${PulseSection}` };
    }
}

}

module.exports = DashboardPage;