it("Handles the survey name popup", async function ()
    {    const RandomTitle = require('./RandomTitle');


      try {
        // Survey Name Pop up
        // Wait for the pop-up to appear
        try {
          await driver.wait(until.elementLocated(By.id("swal2-title")), 10000); // Wait for the title element with ID 'swal2-title'
  
          // Find the pop-up title element
          let popupTitle = await driver.findElement(By.id("swal2-title"));
  
          // Assert that the title is visible and has the correct text
          let isDisplayed = await popupTitle.isDisplayed();
          let titleText = await popupTitle.getText();
  
          assert.strictEqual(
            isDisplayed,
            true,
            "Pop-up title should be displayed."
          );
          assert.strictEqual(
            titleText,
            "Please add Survey Name",
            "Pop-up title text should be 'Please add Survey Name'."
          );
  
          console.log("Pop-up title is displayed with the correct text.");
  
          await driver.sleep(4000); // wait 
  
          // ----- Pop up Ok ---
  
          console.log("Clicking Pop up Ok button...");
          let popOkButton = await driver.wait(
            until.elementLocated(By.xpath("(//div[@class='swal2-actions'])[1]")),
            20000
          );
          await driver.wait(until.elementIsVisible(popOkButton), 20000);
          await popOkButton.click();
  
          await driver.sleep(2000);
        } catch (error) {
          console.error("An error occurred:", error);
        }
  
        //add survey name
        console.log("Adding survey name");
  
        // Locate the input field by its ID (you can also use other locators like name, className, xpath, etc.)
        let inputSurvey = await driver.findElement(
          By.xpath("(//input[@id='inputField'])[1]")
        ); // Replace with the actual ID or other locator
  
        // Clear the field if necessary (optional)
        await inputSurvey.clear();
  
        // Add text to the field
        let RandomSurveyName = generateRandomSurveyName();

        await inputSurvey.sendKeys("RandomSurveyName");

        await driver.sleep(3000); // wait 

        console.log(`Survey name added: ${randomSurveyName}`);

  
        console.log("Survey name added.");
  
        await driver.sleep(2000);
  
        console.log("Proceeding - clicking Next 2nd time...");
        let SurNext2 = await driver.wait(
          until.elementLocated(
            By.xpath("(//div[@class='d-btn-colored btn w-[131px] text-center cursor-pointer'])[1]")),20000); // Increased timeout
        await driver.wait(until.elementIsVisible(SurNext2), 20000);
        await SurNext2.click();
  
        await driver.sleep(2000);
  
        console.log("Proceeding - Survey Scheduling...");
      } catch (error) {
        await captureScreenshot("Added survey name and questions");
        throw error;
      }
    });