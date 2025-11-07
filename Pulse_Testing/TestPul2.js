

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
    } catch (error) {
      await captureScreenshot("login");
      throw error;
    }
  });

  it("Accesses the dashboard", async function () {
    try {
    let dashboardButton = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Access your dashboard']")), 10000);

    await driver.sleep(2000); // wait 
    await dashboardButton.click();
    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,
        20000);
      const windowHandles = await driver.getAllWindowHandles();
      await driver.switchTo().window(windowHandles[1]);
      let dashboardTitle = await driver.getTitle();
      assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
      await driver.sleep(4000); // wait for any subsequent UI changes

    } catch (error) {
      await captureScreenshot("access-dashboard");
      throw error;
    }
  });

  it("Clicks the Create button", async function () {
    try {
      let createButton = await waitForElement(
        "//span[normalize-space()='Create']"
      );
      await driver.sleep(1000); // ensure animations or transitions complete
      await createButton.click();
      await driver.sleep(4000); // wait for any subsequent UI changes
    } catch (error) {
      await captureScreenshot("click-create-button");
      throw error;
    }
  });

  it("Creating Survey using existing survey", async function () {
    try {
        let elementToHover = await driver.findElement(By.xpath('(//div)[186]'));

        await driver.executeScript("arguments[0].scrollIntoView(true);",elementToHover);

        // Create the action sequence for hovering
        const actions = driver.actions({ bridge: true });
        await actions.move({ origin: elementToHover }).perform();

        console.log('Hovered over the element successfully');
        let SelectTemplate = await driver.wait(until.elementLocated(By.xpath("(//button[contains(text(),'Use Template')])[9]")),
            20000
          ); // Increased timeout
          await driver.wait(until.elementIsVisible(SelectTemplate), 10000);
          await driver.executeScript(
            "arguments[0].scrollIntoView(true);",SelectTemplate
          );

          await SelectTemplate.click();
          await driver.sleep(1000); // wait for any subsequent UI changes



    } catch (error) {
      await captureScreenshot("click-create-button");
      throw error;
    }
  });

  

  it("survey name adding", async function () {
    try {
      
      console.log("Adding survey name");

      // Locate the input field by its ID (you can also use other locators like name, className, xpath, etc.)
      let inputSurvey = await driver.wait(until.elementLocated(By.xpath("(//input[@id='inputField'])[1]")),
      20000); // Increased timeout
      await driver.sleep(2000);

      // Clear the field if necessary (optional)
      await inputSurvey.clear();

      // Add text to the field
      await inputSurvey.sendKeys("PulseTest122Survey3830");
      await driver.sleep(2000);

      console.log("Survey name added.");

      await driver.sleep(2000);

      console.log("Proceeding - clicking Next 2nd time...");
      let SurNext2 = await driver.wait(
        until.elementLocated(
          By.xpath(
            "(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]"
          )
        ),
        20000
      ); // Increased timeout
      await driver.wait(until.elementIsVisible(SurNext2), 20000);
      await SurNext2.click();

      await driver.sleep(2000);

      console.log("Proceeding - Survey Scheduling...");
    } catch (error) {
      await captureScreenshot("Added survey name and questions");
      throw error;
    }
  });

  it("Completes survey scheduling - adding date and time", async function () {
    try {
      let dateSelector2 = await driver.wait(
        until.elementLocated(By.xpath("(//input[@id='mat-input-0'])[1]")),
        10000
      );
      await dateSelector2.clear();
      // Add text to the field
      await dateSelector2.sendKeys("10-09-2024");
      await driver.sleep(2000);
      console.log("Survey Date added.");
      let TimeSelector = await driver.wait(
        until.elementLocated(
          By.xpath("(//input[@aria-label='24hr format'])[1]")
        ),
        10000
      );
      await TimeSelector.clear();
      // Add text to the field
      await TimeSelector.sendKeys("12:00");
      console.log("Survey Time added.");
      await driver.sleep(2000);

      let ClickDetails = await driver.wait(
        until.elementLocated(
          By.xpath(
            "(//div[@class='flex item-center justify-center w-[100%]'])[1]"
          )
        ),
        20000
      ); // Increased timeout
      await driver.wait(until.elementIsVisible(ClickDetails), 20000);
      await ClickDetails.click();
      await driver.sleep(1000);
      console.log("Clicked ClickDetails");

      //Clicking Next on scheduling page
      console.log("Proceeding - clicking Next on scheduling page");
      let ScheduleNext = await driver.wait(
        until.elementLocated(
          By.xpath("(//i[@class='vc-arrow-right ml-1 text-[10px]'])[2]")
        ),
        20000
      );
      await driver.wait(until.elementIsVisible(ScheduleNext), 10000);

      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        ScheduleNext
      );

      // Use JavaScript to click the element if necessary
      await driver.executeScript("arguments[0].click();", ScheduleNext);
      console.log("Next on scheduling page clicked successfully.");
      await driver.sleep(1000);
    } catch (error) {
      await captureScreenshot("Completes survey scheduling");
      throw error;
    }
  });

  it("Completes Frequency", async function () {
    try {
        console.log('Selecting Daily');
        let SelectDaily = await driver.findElement(By.xpath("(//input[@id='mat-radio-2-input'])[1]")); // Replace with the actual XPath
        await SelectDaily.click();
    
        await driver.sleep(2000);
        console.log('Selected Daily');
    
        console.log('Proceeding - clicking Next from frequency...');
        let NextFreq = await driver.wait(until.elementLocated(By.xpath("(//button[@type='submit'][normalize-space()='Next'])[2]")), 20000); // Increased timeout
    
        // Scroll the element into view
        await driver.executeScript("arguments[0].scrollIntoView(true);", NextFreq);
    
        // Ensure the element is visible and enabled before clicking
        await driver.wait(until.elementIsVisible(NextFreq), 20000);
        await driver.wait(until.elementIsEnabled(NextFreq), 20000);
        await NextFreq.click();
    
        console.log('Next from frequency page clicked successfully.');
    
        await driver.sleep(3000);
        console.log('Clicked Next on Frequency page');
    } catch (error) {
      await captureScreenshot("click-create-button");
      throw error;
    }
  });
  it("'Selecting Next from Audience page", async function () {
    try {
        console.log('Selecting Next from Audience page');
        let NextAud = await driver.findElement(By.xpath("(//button[@type='submit'][normalize-space()='Next'])[3]")); // Replace with the actual XPath
        await NextAud.click();
    
        await driver.sleep(2000);
        console.log('Selected Next Audience');
    
        await driver.sleep(2000);
    } catch (error) {
      await captureScreenshot("click-create-button");
      throw error;
    }
  });

  it("Selecting Next from Email page", async function () {
    try {
        console.log('Selecting Next from Email page');
        let NextEmail = await driver.wait(until.elementLocated(By.xpath("(//button[@type='submit'][normalize-space()='Next'])[4]")), 20000); // Increased timeout
        await driver.executeScript("arguments[0].scrollIntoView(true);", NextEmail);
        // Ensure the element is visible and enabled before clicking
        await driver.wait(until.elementIsVisible(NextEmail), 20000);
        await driver.wait(until.elementIsEnabled(NextEmail), 20000);
        await NextEmail.click();
    
        await driver.sleep(2000);
        console.log('Selected Next from Email page');
    } catch (error) {
      await captureScreenshot("click-create-button");
      throw error;
    }
  });
  it("Survey Preview and Launch Survey", async function () {
    try {
        console.log('Selecting Next from Email page');
        let LaunchSurvey = await driver.wait(until.elementLocated(By.xpath("(//button[normalize-space()='Launch Survey'])[1]")), 20000); // Increased timeout
        await driver.executeScript("arguments[0].scrollIntoView(true);", LaunchSurvey);
        // Ensure the element is visible and enabled before clicking
        await driver.wait(until.elementIsVisible(LaunchSurvey), 20000);
        await driver.wait(until.elementIsEnabled(LaunchSurvey), 20000);
        await LaunchSurvey.click();
        await driver.sleep(4000);

    } catch (error) {
      await captureScreenshot("Launch Survey");
      throw error;
    }
  });

});
