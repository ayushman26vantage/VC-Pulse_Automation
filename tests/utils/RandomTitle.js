// Function to generate a random survey name
function generateRandomSurveyName() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `PulseTestSurvey${timestamp}${randomNum}`;
}

// Function to generate a random email
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return `testuser${timestamp}${randomNum}@example.com`;
}

// Function to generate a random string
function generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to generate a random number
function generateRandomNumber(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random date in the future
function generateRandomFutureDate(daysFromNow = 30) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * daysFromNow) + 1);
    return date.toISOString().split('T')[0];
}

// Function to generate a random time
function generateRandomTime() {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

module.exports = { 
    generateRandomSurveyName,
    generateRandomEmail,
    generateRandomString,
    generateRandomNumber,
    generateRandomFutureDate,
    generateRandomTime
};
