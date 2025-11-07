const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const fs = require("fs");


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
      await driver.get("https://api.vantagecircle.co.in/");
      let initialTitle = await driver.getTitle();
      assert.strictEqual(
        initialTitle,
        "The Employee Benefits & Engagement Platform - Vantage Circle"
      );

    } catch (error) {
      await captureScreenshot("navigate-and-check-title");
      throw error;
    }
  });

  it("Logs into the application", async function () {
    try {
      let loginDropdown = await waitForElement('//button[@id="logindropdown"]');
      await loginDropdown.click();
      let emailField = await waitForElement("//input[@id='LoginForm_email']");
      const email = "admin@xyzank.com";
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
      throw error;
    }
  });

  it("Handles Redeem Pop up if present", async function () {
    try {
      console.log("Clicking Pop up Ok button...");
      let popupXPath = await driver.wait(
        until.elementLocated(By.xpath("//*[@id='mat-dialog-0']/vc-growth-experiment-popup/div/div/div/div[2]/div[3]/button")),60000 );
      await driver.wait(until.elementIsVisible(popupXPath), 40000);
      await driver.wait(until.elementIsEnabled(popupXPath), 10000);

      await popupXPath.click();

      await driver.sleep(2000);
    } catch (error) {
      console.error("An error occurred:", error);
    }
      
  });

  it("Clicks Home", async function () {
    try {
      console.log("Clicking Pop up Ok button...");
      let HomeXPath = await driver.wait(until.elementLocated(By.xpath("//*[@id='company_logo_click']/picture/img")),60000 );
      await driver.wait(until.elementIsVisible(HomeXPath), 40000);
      await driver.wait(until.elementIsEnabled(HomeXPath), 10000);

      await HomeXPath.click();

      await driver.sleep(2000);
    } catch (error) {
      console.error("An error occurred:", error);
    }
      
  });

    it('Checks if there is a pending survey', async function (){
        

        try {
            let Survey_Pending = await driver.wait(
                until.elementLocated(By.xpath("(//p[@class='right-divider'])[1]")),
                20000
              ); 

              let SurveyText = await Survey_Pending.getText();
            
              // Assert that the text is what you expect
              assert.strictEqual(SurveyText,"You have pending survey");
             console.log("asserts that there is a pending survey");
             await driver.sleep(12000);
        } catch (error) {
            console.error("Error finding a pending survey", error);
            await driver.takeScreenshot().then(function(image) {
                require('fs').writeFileSync('pending_survey.png', image, 'base64');
            });
            throw error;
        }
    });

    it("Start Survey", async function () {
      try {
        console.log("Clicking Pop up Ok button...");
        let SurveyXPath = await driver.wait(until.elementLocated(By.xpath("//*[@id='root-body']/vc-root/div/div/main/div/vc-landing-page/div/div[3]/div[3]/div[2]/span")),60000 );
        await driver.wait(until.elementIsVisible(SurveyXPath), 40000);
        await driver.wait(until.elementIsEnabled(SurveyXPath), 10000);
  
        await SurveyXPath.click();
  
        await driver.sleep(9000);
      } catch (error) {
        console.error("An error occurred:", error);
      }
        
    });
    
});
    
    
    
    
    
    