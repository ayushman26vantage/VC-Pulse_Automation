const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const fs = require("fs");
const allure = require('allure-commandline'); // Allure command line for reports

describe("Vantage Circle Automation Tests", function () {
  this.timeout(30000); // Set a realistic timeout for each test

  let driver;

  before(async function () {
    // Setup driver for the entire suite
    let options = new chrome.Options();
    options.addArguments("--incognito", "--start-maximized");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    // Cleanup driver after test suite is done
    if (driver) {
      await driver.quit();
    }
  });

  async function waitForElement(xpath, timeout = 20000) {
    const element = await driver.wait(
      until.elementLocated(By.xpath(xpath)),
      timeout,
      `Timeout after ${timeout}ms waiting for element with xpath: ${xpath}`
    );
    return await driver.wait(until.elementIsVisible(element), timeout);
  }

  async function captureScreenshot(name) {
    const image = await driver.takeScreenshot();
    fs.writeFileSync(`${name}-${Date.now()}.png`, image, "base64");
  }

  it("Navigates to the URL and checks the page title", async function () {
    try {
      allure.feature("Page Title Check"); // Add feature for Allure
      await driver.get("https://api.vantagecircle.co.in/");
      let initialTitle = await driver.getTitle();
      assert.strictEqual(
        initialTitle,
        "The Employee Benefits & Engagement Platform - Vantage Circle"
      );
    } catch (error) {
      await captureScreenshot("navigate-and-check-title");
      allure.attachment("Screenshot", fs.readFileSync("navigate-and-check-title.png"));
      allure.severity('critical');
      throw error;
    }
  });

  it("Logs into the application", async function () {
    try {
      allure.feature("Login Test"); // Add feature for Allure
      let loginDropdown = await waitForElement('//button[@id="logindropdown"]');
      await loginDropdown.click();
      let emailField = await waitForElement("//input[@id='LoginForm_email']");
      const email = "Nibir.Bora@vantagecircle.com";
      const password = "welcome";
      let passwordField = await waitForElement(
        "//input[@id='LoginForm_password']"
      );
      let loginButton = await waitForElement("//button[@id='loginbtn']");
      await emailField.sendKeys(email);
      await passwordField.sendKeys(password);
      await loginButton.click();
      await driver.sleep(4000);
    } catch (error) {
      await captureScreenshot("login");
      allure.attachment("Screenshot", fs.readFileSync("login.png"));
      allure.severity('critical');
      throw error;
    }
  });

  // Further tests with Allure reporting...

});
