const BasePage = require("./BasePage").default;
/*import BasePage from "./BasePage";*/


class LoginPage extends BasePage {

    async navigateToLoginPage() {
        await this.driver.get("https://api.vantagecircle.co.in/");
        let title = await this.driver.getTitle();
        return title === "The Employee Benefits & Engagement Platform - Vantage Circle";
    }

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

/*export default LoginPage;*/
module.exports = LoginPage;
