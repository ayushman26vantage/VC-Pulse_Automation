const { Builder, By, Key, until } = require('selenium-webdriver');

// Function to generate a random survey name
// RandomTitle.js
function generateRandomSurveyName() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `PulseTestSurvey${timestamp}${randomNum}`;
}

module.exports = { generateRandomSurveyName }; // Exporting the function
