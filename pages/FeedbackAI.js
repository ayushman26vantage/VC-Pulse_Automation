const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const fs = require("fs");
const DashboardPage = require('./DashboardPage');
const RandomTitle = require('./RandomTitle'); 


describe("Vantage Circle Automation Tests", function () {
  this.timeout(30000); // Set a realistic timeout for each test
  this.retries(2);
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
                async () => (await driver.getAllWindowHandles()).length === 2,
                20000
              );
              const windowHandles = await driver.getAllWindowHandles();
              await driver.switchTo().window(windowHandles[1]);
              let dashboardTitle = await driver.getTitle();
              assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
              await driver.sleep(4000); // wait 
        
            } catch (error) {
              await captureScreenshot("access-dashboard");
              throw error;
            }
          });

 it("Clicks on product's menu dropdown - select Pulse", async function () {
            try {
              await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
      
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
                  await captureScreenshot("select-pulse");
                  throw error;
                }
              
            });

            it("Clicks on survey view more", async function () {
              try {
                //await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
                    let survey_viewmore = await driver.findElement(By.xpath("(//div[@routerlink='surveyId'])[1]",20000));
                    await driver.sleep(1000); // ensure animations or transitions complete
                    await survey_viewmore.click();

                    //let overview_drop = await driver.findElement(By.xpath("(//div[@class='flex w-full justify-between items-center'])[3]",20000));
                    //await driver.sleep(1000); // ensure animations or transitions complete
                   // await overview_drop.click();
                    await driver.sleep(3000); // wait for response
  
                    // selecting a survey
                    //let select_survey = await driver.findElement(By.xpath("(//div[@class='flex w-full justify-between items-center'])[3]",20000));
                    //await driver.sleep(1000); // ensure animations or transitions complete
                   // await select_survey.click();
                   // await driver.sleep(5000); // wait for response
                    //assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
  
        
                  } catch (error) {
                    await captureScreenshot("view_more");
                    throw error;
                  }
                
              });

              /*it("Clicks on survey overview dropdown - select any survey", async function () {
                try {
                  //await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);

                     let survey_text = await driver.findElement(By.xpath("(//span[@class='ng-star-inserted'])[1]",20000));
                     await driver.sleep(1000); // ensure animations or transitions complete
                     await survey_text.click();
                     
                     assert.strictEqual(survey_text, "You are now viewing the summarized data from all conducted surveys.");


                      let survey_over = await driver.findElement(By.xpath("(//div[@class='w-full'])[1]",20000));
                      await driver.sleep(1000); // ensure animations or transitions complete
                      await survey_over.click();
  
                      //let overview_drop = await driver.findElement(By.xpath("(//div[@class='flex w-full justify-between items-center'])[3]",20000));
                      //await driver.sleep(1000); // ensure animations or transitions complete
                     // await overview_drop.click();
                      await driver.sleep(3000); // wait for response
    
                      // selecting a survey
                      let select_survey = await driver.findElement(By.xpath("(//div[@class='flex w-full justify-between items-center'])[3]",20000));
                      await driver.sleep(1000); // ensure animations or transitions complete
                      await select_survey.click();
                      await driver.sleep(5000); // wait for response
                      //assert.strictEqual(dashboardTitle, "Vantage Circle | Dashboard");
    
          
                    } catch (error) {
                      await captureScreenshot("select_survey");
                      throw error;
                    }
                  
                });*/

                it("Clicks the Insights", async function () {
                  try {
                    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
            
                        let clickInsights = await driver.findElement(By.xpath("(//p[@class='menu-title flex w-full items-center justify-between text-gun-powder group-hover:text-lucky-point group-hover:font-medium'])[3]",20000));
                        await driver.sleep(1000); // ensure animations or transitions complete
                        await clickInsights.click();
                        await driver.sleep(3000); // wait for response
            
                    } catch (error) {
                        console.error("Error when clicking the Create button:", error);
                        await driver.takeScreenshot().then(function(image) {
                            require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                        });
                        throw error;
                    }
                });

                /*it("Clicks the Insights - categories", async function () {
                  try {
                    //await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
            
                        let InsightsCateg = await driver.findElement(By.xpath("(//div[@class='text-gun-powder hover:text-purple-500 py-3 border-b-2 border-purple-500 text-purple-500'])[1]",20000));
                        await driver.sleep(1000); // ensure animations or transitions complete
                        await InsightsCateg.click();
                        await driver.sleep(3000); // wait for response
            
                    } catch (error) {
                        console.error("Error when Insights - categories", error);
                        await driver.takeScreenshot().then(function(image) {
                            require('fs').writeFileSync('click-Insights - categories.png', image, 'base64');
                        });
                        throw error;
                    }
                });*/

                it("Clicks the Insights - segments", async function () {
                  try {
                    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
            
                        let InsightsSeg = await driver.findElement(By.xpath('//*[@id="router"]/vantage-circle-dashboard-pulse/vantage-circle-dashboard-insights/div/vantage-circle-dashboard-insights-sub-header/div/div[2]',20000));
                        await driver.sleep(1000); // ensure animations or transitions complete
                        await InsightsSeg.click();
                        await driver.sleep(3000); // wait for response
            
                    } catch (error) {
                        console.error("Error when clicking the Create button:", error);
                        await driver.takeScreenshot().then(function(image) {
                            require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                        });
                        throw error;
                    }
                });

                it("Clicks the Insights - Exp Cycle", async function () {
                  try {
                    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
            
                        let InsightsExpCycle = await driver.findElement(By.xpath('//*[@id="router"]/vantage-circle-dashboard-pulse/vantage-circle-dashboard-insights/div/vantage-circle-dashboard-insights-sub-header/div/div[3]/p/span',20000));
                        await driver.sleep(1000); // ensure animations or transitions complete
                        await InsightsExpCycle.click();
                        await driver.sleep(3000); // wait for response
            
                    } catch (error) {
                        console.error("Error when clicking the Create button:", error);
                        await driver.takeScreenshot().then(function(image) {
                            require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                        });
                        throw error;
                    }
                });

                it("Clicks the Insights - Feedback", async function () {
                  try {
                    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
            
                        let InsightsFeedback = await driver.findElement(By.xpath('//*[@id="router"]/vantage-circle-dashboard-pulse/vantage-circle-dashboard-insights/div/vantage-circle-dashboard-insights-sub-header/div/div[4]',20000));
                        await driver.sleep(2000); // ensure animations or transitions complete
                        await InsightsFeedback.click();
                        await driver.sleep(3000); // wait for response
            
                    } catch (error) {
                        console.error("Error when clicking the Create button:", error);
                        await driver.takeScreenshot().then(function(image) {
                            require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                        });
                        throw error;
                    }
                });

                it("Sentiment Analysis Testing", async function () {
                    try {
                      await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2,20000);
              
                          let InsightsFeedback = await driver.findElement(By.xpath('//*[@id="router"]/vantage-circle-dashboard-pulse/vantage-circle-dashboard-insights/div/vantage-circle-dashboard-insights-sub-header/div/div[4]',20000));
                          await driver.sleep(2000); // ensure animations or transitions complete
                          await InsightsFeedback.click();
                          await driver.sleep(3000); // wait for response
              
                      } catch (error) {
                          console.error("Error when clicking the Create button:", error);
                          await driver.takeScreenshot().then(function(image) {
                              require('fs').writeFileSync('click-create-button-failure.png', image, 'base64');
                          });
                          throw error;
                      }
                  });

         
  
    });
