const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async navigateToLoginPage() {
        await this.page.goto('https://api.vantagecircle.co.in/');
        const title = await this.page.title();
       // return title === "The Employee Benefits & Engagement Platform - Vantage Circle";
    }

    async login(email, password) {
        // Click login dropdown
        await this.waitForElement('//button[@id="logindropdown"]');
        await this.page.click('//button[@id="logindropdown"]');
        
        // Fill email
        await this.waitForElement("//input[@id='LoginForm_email']");
        await this.page.fill("//input[@id='LoginForm_email']", email);
        
        // Fill password
        await this.waitForElement("//input[@id='LoginForm_password']");
        await this.page.fill("//input[@id='LoginForm_password']", password);
        
        // Click login button
        await this.waitForElement("//button[@id='loginbtn']");
        await this.page.click("//button[@id='loginbtn']");
        
        // Wait for login to complete
       // await this.page.waitForLoadState('networkidle');
    }

    async handleRedeemPopup() {
        try {
            // Wait for popup to appear (with timeout)
            await this.waitForElement("//*[@id='mat-dialog-0']/vc-growth-experiment-popup/div/div/div/div[2]/div[3]/button", 60000);
            await this.page.click("//*[@id='mat-dialog-0']/vc-growth-experiment-popup/div/div/div/div[2]/div[3]/button");
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.log("Redeem popup not found or already handled");
        }
    }

    async clickHome() {
        try {
            await this.waitForElement("//*[@id='company_logo_click']/picture/img");
            await this.page.click("//*[@id='company_logo_click']/picture/img");
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.log("Home button not found");
        }
    }

    async clickProfile() {
        // Wait for and click the profile image
        await this.waitForElement("(//img[@alt='profileImage'])[1]", 30000);
        await this.page.click("(//img[@alt='profileImage'])[1]");
        await this.page.waitForTimeout(250);
    }

    async clickAdminDashboard() {
        // Click Admin Dashboard
        await this.waitForElement("//span[normalize-space()='Admin Dashboard']", 30000);
        await this.page.click("//span[normalize-space()='Admin Dashboard']");
        
        // Wait for new window to open
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            // The click action that triggers the new window
        ]);
        
        // Switch to the new page
        this.page = newPage;
        await this.page.waitForLoadState('networkidle');
        
        return this.page;
    }

 


    async checkPendingSurvey() {
        try {
            // Scroll down to find the pending survey
            await this.page.evaluate(() => window.scrollBy(0, 100));
            await this.page.waitForTimeout(2000);

            // Look for pending survey text
            const surveyText = await this.page.textContent("//*[@id='root-body']/vc-root/div/div/main/div/vc-rewards-home/div[2]/div/div[1]/vc-pulse-survey-widget/div/div/div[1]/div[1]/p");
            
            if (surveyText === "Your voice is important to us") {
                console.log("Found pending survey");
                return true;
            }
            
            return false;
        } catch (error) {
            console.log("No pending survey found");
            return false;
        }
    }

    async startSurvey() {
        try {
            // Scroll down the page to find the pending survey
            await this.page.evaluate(() => window.scrollBy(0, 100));
            await this.page.waitForTimeout(2000);
            
            // Click Start Survey button
            await this.waitForElement("//*[@id='root-body']/vc-root/div/div/main/div/vc-rewards-home/div[2]/div/div[1]/vc-pulse-survey-widget/div/div/div[1]/div[2]/button", 60000);
            await this.page.click("//*[@id='root-body']/vc-root/div/div/main/div/vc-rewards-home/div[2]/div/div[1]/vc-pulse-survey-widget/div/div/div[1]/div[2]/button");
            await this.page.waitForTimeout(10000);
        } catch (error) {
            console.log("Survey start button not found or survey already completed");
        }
    }

    async clickWork() {
        try {
            await this.waitForElement("//*[@id='root-body']/vc-root/div/div/header/vc-header/div/div/div/div[2]/div/vc-module-options/div/div[1]/a[2]/div/svg-icon");
            await this.page.click("//*[@id='root-body']/vc-root/div/div/header/vc-header/div/div/div/div[2]/div/vc-module-options/div/div[1]/a[2]/div/svg-icon");
            await this.page.waitForTimeout(2000);
        } catch (error) {
            console.log("Work button not found");
        }
    }
}

module.exports = LoginPage;
