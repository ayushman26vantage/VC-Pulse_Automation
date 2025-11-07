const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const fs = require("fs");
const DashboardPage = require('./DashboardPage');
const RandomTitle = require('./RandomTitle'); 



describe("Vantage Circle Automation Tests", function () {
  this.timeout(60000); // Set a realistic timeout for each test
  //this.retries(2);
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
      const email = "sagarika.devroy@vantagecircle.com";
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

  
  it("Click profile icon", async function () {
    try {
        // Wait for and click the profile image
        const profileClick = await waitForElement("(//img[@alt='profileImage'])[1]", 30000); // Increased timeout
        await profileClick.click();
        await driver.sleep(4000); // wait 
        // Wait for a new window to open  
      }
        // Switch to the new Admin Dashboard window
     catch (error) {
        //await captureScreenshot("access-dashboard"); // Capture screenshot for debugging
        throw error; // Rethrow the error to fail the test
    }
});

it("Click Admin Dashboard", async function () {

  try {
        const dashboardButton = await waitForElement("//span[normalize-space()='Admin Dashboard']", 30000);
        await driver.wait(until.elementIsVisible(dashboardButton), 10000);
        await driver.wait(until.elementIsEnabled(dashboardButton), 10000);
        await dashboardButton.click();
    
        
        // Wait for a new window to open
        await driver.wait(
          async () => (await driver.getAllWindowHandles()).length > 1, 30000, // Increased timeout for the new window
          "New window did not open within the expected time"
      ); 
        } catch (error) {
         //await captureScreenshot("access-dashboard");
         throw error;
        }
      });

  
it("Accesses the dashboard - switch to next window", async function () {

      try {
        await driver.wait(
                async () => (await driver.getAllWindowHandles()).length === 2,30000);
              const windowHandles = await driver.getAllWindowHandles();
              await driver.switchTo().window(windowHandles[1]);
              let dashboardTitle = await driver.getTitle();
              assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
              await driver.sleep(4000); // wait 
        
            } catch (error) {
              //await captureScreenshot("access-dashboard");
              throw error;
            }
          });

 it("Clicks on product's menu dropdown - select Pulse", async function () {
            try {
              await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,30000);
      
                  let menu_drop = await driver.findElement(By.xpath("//span[@class='text-sm text-white w-32 ng-star-inserted']",20000));
                  await driver.sleep(1000); // ensure animations or transitions complete
                  await menu_drop.click();
                  await driver.sleep(3000); // wait for response

                  // selecting Vantage Pulse
                  let select_pulse = await driver.findElement(By.xpath("//span[normalize-space()='Vantage Pulse']",20000));
                  await driver.sleep(1000); // ensure animations or transitions complete
                  await select_pulse.click();
                  await driver.sleep(5000); // wait for response
                  //assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");

      
                } catch (error) {
                  //await captureScreenshot("select-pulse");
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
   
    it("Clicks the Create your own Survey", async function () {
      const DashboardPage = require('../pages/DashboardPage');

              try {
                await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
        
                let createSurvey = await driver.wait(until.elementLocated(By.xpath("//div[@class='cursor-pointer hover:opacity-85']//*[name()='svg']")),20000); // Increased timeout
                await driver.wait(until.elementIsVisible(createSurvey), 20000);
                await createSurvey.click();
                    await driver.sleep(3000); // wait for response
        
                } catch (error) {
                    console.error("Error when clicking the Create button:", error);
                    await driver.takeScreenshot().then(function(image) {
                        require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                    });
                    throw error;
                }
            }); 
            
            it("Selecting elements", async function () {
              const DashboardPage = require('../pages/DashboardPage');
        
                      try {
                        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
                
                        console.log("Proceeding - Survey Creating...");
                        let Survey1 = await driver.wait(until.elementLocated(By.xpath("(//label[@for='Recognition'])[1]")),
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
                
                        } catch (error) {
                            console.error("Error when clicking the Create button:", error);
                            await driver.takeScreenshot().then(function(image) {
                                require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                            });
                            throw error;
                        }
                    });  
            
            it("Adding survey name", async function () {
              const DashboardPage = require('../pages/DashboardPage');
              const RandomTitle = require('../pages/RandomTitle'); 

              try {
                // await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
        
             
              
              //adding survey name
              // await driver.wait(until.elementLocated(By.xpath("//input[@id='inputfield-tdnjyo']")), 60000); // Increased timeout
              // await AddSurveyName.click();
              const surveyName = "RandomTest1";

              // const ele = await driver.findElement(By.xpath("//input[@id='inputfield-tdnjyo']"));
              await driver.findElement(By.css("vc-input-field[type='text'] div div input")).sendKeys(surveyName);

            
              // await ele.sendKeys(surveyName);
              console.log("Proceeding - clicking Next 2nd time...");
                        let SurNext2 = await driver.wait(until.elementLocated(By.xpath("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]")), 20000);
                        await driver.wait(until.elementIsVisible(SurNext2), 20000);
                        await SurNext2.click();
                        await driver.sleep(2000);
                
                        console.log("Proceeding - Survey Scheduling...");
                
                        } catch (error) {
                            console.error("Error when clicking the Create button:", error);
                            await driver.takeScreenshot().then(function(image) {
                                require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                            });
                            throw error;
                        }
                    });   
                    it("Completes survey scheduling - adding date and time", async function () {
                      const DashboardPage = require('../pages/DashboardPage');
                
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
