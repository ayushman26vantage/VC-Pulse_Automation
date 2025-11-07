const { Builder } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const driver = require('selenium-webdriver')

class BasePage {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }

    async setUp() {
        await this.driver.manage().window().maximize();
        await this.driver.manage().setTimeouts({ implicit: 35000});

    }

    async tearDown() {
        await this.driver.quit();
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = BasePage;