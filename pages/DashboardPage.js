const BasePage = require("./BasePage");
const { By, until } = require("selenium-webdriver"); // Import By and until here

class DashboardPage extends BasePage {
    async accessDashboard() {
        let dashboardButton = await this.driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Access your dashboard']")), 10000);
        await this.driver.sleep(2000); // Adding a delay to ensure the page loads completely before interacting
        await dashboardButton.click();
        let handles = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(handles[1]);
        let title = await this.driver.getTitle();
        return title === "Vantage Circle | Dashboard";
    }

    async createSurvey() {
        let createButton = await this.waitForElement("//span[normalize-space()='Create']");
        await this.driver.sleep(1000); // Ensure any animations or transitions complete before interacting
        await createButton.click();
        await this.driver.sleep(3000); // Further delay to wait for any potential dynamic content
    }
}

module.exports = DashboardPage;
