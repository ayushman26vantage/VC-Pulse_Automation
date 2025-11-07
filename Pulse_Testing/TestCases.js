const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('./BeLoginPage');
const DashboardPage = require('./DashboardPage');
const RandomTitle = require('./RandomTitle'); 

describe('Vantage Circle Automation Tests', function () {
    this.timeout(30000);
    let driver;

    const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

before(async function () {
    try {
        let options = new chrome.Options();
        options.addArguments("--incognito", "--start-maximized");
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        console.log("WebDriver initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize WebDriver: ", error);
        throw error;  // Rethrow the error to ensure Mocha catches it and reports it.
    }
});

after(async function () {
  // Cleanup driver after test suite is done
  if (driver) {
    await driver.quit();
  }
});

    it("Navigates to the URL and checks the page title", async function () {
        try {
            await driver.get("https://api.vantagecircle.co.in/");
            let initialTitle = await driver.getTitle();
            assert.strictEqual(
                initialTitle,
                "The Employee Benefits & Engagement Platform - Vantage Circle"
            );
        } catch (error) {
            await driver.takeScreenshot().then(function(image) {
                require('fs').writeFileSync('navigate-and-check-title-failure.png', image, 'base64');
            });
            throw error;
        }
    });

    it('Logs into the application and accesses the dashboard', async function () {
        const loginPage = new LoginPage(driver);
        const dashboardPage = new DashboardPage(driver);

        try {
            let isTitleCorrect = await loginPage.navigateToLoginPage();
            assert.strictEqual(isTitleCorrect, true, "Login page title is incorrect");

            await loginPage.login("admin@xyzank.com", "welcome"); // Replace with your actual credentials
            let isDashboardAccessed = await dashboardPage.accessDashboard();
            assert.strictEqual(isDashboardAccessed, true, "Failed to access dashboard");
        } catch (error) {
            console.error("Error during login or dashboard access:", error);
            await driver.takeScreenshot().then(function(image) {
                require('fs').writeFileSync('login-or-dashboard-failure.png', image, 'base64');
            });
            throw error;
        }
    });

    it("Accesses the dashboard - switch to next window", async function () {
      const DashboardPage = require('./DashboardPage');

      try {
       
        /*let dashboardButton = await driver.wait(until.elementLocated(By.xpath("(//button[normalize-space()='Access your dashboard'])[1]")), 20000);
  
        await driver.sleep(2000); // wait 
        await dashboardButton.click();*/
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
      
        let dashboardTitle = await driver.getTitle();
        assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
        await driver.sleep(4000);
        /*const windowHandles = await driver.getAllWindowHandles();
        await driver.switchTo().window(windowHandles[1]);
        let dashboardTitle = await driver.getTitle();
        assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
        await driver.sleep(4000); // wait */
  
      } catch (error) {
        console.error("Error during dashboard access:", error);
        await driver.takeScreenshot().then(function(image) {
            require('fs').writeFileSync('login-or-dashboard-failure.png', image, 'base64');
        });
        throw error;
      }
    });
  
    
    it("Clicks the Create button", async function () {
      try {
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);

            let createButton = await driver.findElement(By.xpath("(//span[normalize-space()='Create'])[1]",20000));
            await driver.sleep(1000); // ensure animations or transitions complete
            await createButton.click();
            await driver.sleep(3000); // wait for response

        } catch (error) {
            console.error("Error when clicking the Create button:", error);
            await driver.takeScreenshot().then(function(image) {
                require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
            });
            throw error;
        }
    });
  
it("Initiates survey creation", async function () {
  const DashboardPage = require('./DashboardPage');
  
      try {
        console.log('Clicking on the "Create Survey" button...');
        let createSurvey = await driver.wait(
          until.elementLocated(
            By.xpath(
              "//div[@class='cursor-pointer hover:opacity-85']//*[name()='svg']"
            )
          ),
          20000
        ); // Increased timeout
        await driver.wait(until.elementIsVisible(createSurvey), 20000);
        await createSurvey.click();
        console.log("Proceeding - Survey Creating...");
        let Survey1 = await driver.wait(
          until.elementLocated(By.xpath("(//label[@for='Recognition'])[1]")),
          20000
        ); // Increased timeout
        await driver.wait(until.elementIsVisible(Survey1), 20000);
        await Survey1.click();
  
        let Survey2 = await driver.wait(
          until.elementLocated(By.xpath("(//label[@for='Engagement'])[1]")),
          20000
        ); // Increased timeout
        await driver.wait(until.elementIsVisible(Survey2), 20000);
        await Survey2.click();
  
        await driver.sleep(1000);
        console.log("Proceeding - clicking Next...");
        let SurNext = await driver.wait(
          until.elementLocated(
            By.xpath(
              "(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]"
            )
          ),
          20000
        ); // Increased timeout
        await driver.wait(until.elementIsVisible(SurNext), 20000);
        await SurNext.click();
  
        await driver.sleep(4000); // wait 
      } catch (error) {
        await captureScreenshot("initiate-survey-creation");
        throw error;
      }
    });
  
    it("Handles the survey name popup", async function () {
      const RandomTitle = require('./RandomTitle'); 

      try {
        // Wait for the pop-up to appear
        await driver.wait(until.elementLocated(By.id("swal2-title")), 10000);

        // Find and verify the pop-up title element
        let popupTitle = await driver.findElement(By.id("swal2-title"));
        let isDisplayed = await popupTitle.isDisplayed();
        let titleText = await popupTitle.getText();

        assert.strictEqual(isDisplayed, true, "Pop-up title should be displayed.");
        assert.strictEqual(titleText, "Please add Survey Name", "Pop-up title text should be 'Please add Survey Name'.");

        console.log("Pop-up title is displayed with the correct text.");
        await driver.sleep(4000);

        console.log("Clicking Pop up Ok button...");
        let popOkButton = await driver.wait(until.elementLocated(By.xpath("(//div[@class='swal2-actions'])[1]")), 20000);
        await driver.wait(until.elementIsVisible(popOkButton), 20000);
        await popOkButton.click();
        await driver.sleep(2000);

        // Add survey name using the function from RandomTitle module
        console.log("Adding survey name");
        let inputSurvey = await driver.findElement(By.xpath("(//input[@id='inputField'])[1]"));
        await inputSurvey.clear();
        let randomSurveyName = RandomTitle.generateRandomSurveyName(); // Using the imported function to generate a name
        await inputSurvey.sendKeys(randomSurveyName);
        console.log(`Survey name added: ${randomSurveyName}`);
        await driver.sleep(3000);

        console.log("Survey name added.");
        await driver.sleep(2000);

        console.log("Proceeding - clicking Next 2nd time...");
        let SurNext2 = await driver.wait(until.elementLocated(By.xpath("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]")), 20000);
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
      const DashboardPage = require('./DashboardPage');

      try {
        let dateSelector2 = await driver.wait(
          until.elementLocated(By.xpath("(//input[@id='mat-input-0'])[1]")),
          10000
        );
        await driver.wait(until.elementIsVisible(dateSelector2), 20000);

        await dateSelector2.clear();
        // Add text to the field
        await dateSelector2.sendKeys("12-09-2024");
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
        await TimeSelector.sendKeys("06:30");
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
    it("Selecting Next from Audience page", async function () {
      try {
          console.log('Selecting Next from Audience page');
          let NextAud = await driver.findElement(By.xpath("(//button[@type='submit'][normalize-space()='Next'])[3]")); // Replace with the actual XPath
          await NextAud.click();
      
          await driver.sleep(2000);
          console.log('Selected Next Audience');
      
          await driver.sleep(2000); // wait 
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
          await driver.sleep(9000);
  
      } catch (error) {
        await captureScreenshot("Launch Survey");
        throw error;
      }
    });
});

