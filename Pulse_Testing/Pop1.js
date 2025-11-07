const { Builder, By, Key, until } = require('selenium-webdriver');

// Function to generate a random survey name
function generateRandomSurveyName() {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Random number for extra randomness
    return `PulseTestSurvey${timestamp}${randomNum}`;
}

describe('Selenium Test with Random Survey Name', function() {
    this.timeout(50000); // Adjust timeout as needed
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('Add random survey name to the input field', async function() {
        console.log("Adding survey name");
        
        // Navigate to your test page
        await driver.get('https://your-testing-url.com');

        // Locate the input field by its ID or other locator
        let inputSurvey = await driver.findElement(By.xpath("(//input[@id='inputField'])[1]"));
        
        // Clear the field if necessary
        await inputSurvey.clear();
        
        // Generate a random survey name and add text to the field
        let randomSurveyName = generateRandomSurveyName();
        await inputSurvey.sendKeys(randomSurveyName);
        
        // Log the randomly generated survey name for reference
        console.log(`Survey name added: ${randomSurveyName}`);
        
        await driver.sleep(3000); // wait to see the input

        console.log("Survey name added.");
        
        await driver.sleep(2000); // Additional wait if needed
    });
});
