#!/usr/bin/env node

/**
 * Vantage Pulse Playwright Setup Verification Script
 * This script verifies that the Playwright conversion is complete and ready to use
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Vantage Pulse Playwright Setup...\n');

// Check if required files exist
const requiredFiles = [
    'package.json',
    'playwright.config.js',
    'tests/pages/BasePage.js',
    'tests/pages/LoginPage.js',
    'tests/pages/DashboardPage.js',
    'tests/utils/RandomTitle.js',
    'tests/overview.spec.js',
    'tests/attempt-survey.spec.js',
    'tests/create-survey.spec.js',
    'tests/use-existing-survey.spec.js',
    'README.md',
    'MIGRATION_GUIDE.md',
    'CONVERSION_SUMMARY.md',
    'setup.sh'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

// Check package.json for Playwright dependencies
console.log('\n📦 Checking package.json...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageJson.devDependencies && packageJson.devDependencies['@playwright/test']) {
        console.log('✅ @playwright/test dependency found');
    } else {
        console.log('❌ @playwright/test dependency missing');
        allFilesExist = false;
    }
    
    if (packageJson.scripts && packageJson.scripts.test) {
        console.log('✅ Test scripts configured');
    } else {
        console.log('❌ Test scripts missing');
        allFilesExist = false;
    }
} catch (error) {
    console.log('❌ Error reading package.json');
    allFilesExist = false;
}

// Check test directory structure
console.log('\n🧪 Checking test structure...');
const testFiles = [
    'tests/overview.spec.js',
    'tests/attempt-survey.spec.js', 
    'tests/create-survey.spec.js',
    'tests/use-existing-survey.spec.js'
];

testFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

// Check page object files
console.log('\n📄 Checking page objects...');
const pageObjects = [
    'tests/pages/BasePage.js',
    'tests/pages/LoginPage.js',
    'tests/pages/DashboardPage.js'
];

pageObjects.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

// Check for node_modules (indicating npm install was run)
console.log('\n📦 Checking dependencies...');
if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules found (dependencies installed)');
} else {
    console.log('⚠️  node_modules not found - run "npm install" first');
}

// Check for Playwright installation
console.log('\n🌐 Checking Playwright installation...');
if (fs.existsSync('node_modules/@playwright')) {
    console.log('✅ Playwright package found');
} else {
    console.log('⚠️  Playwright not installed - run "npx playwright install"');
}

// Summary
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
    console.log('🎉 SETUP VERIFICATION: SUCCESS!');
    console.log('\n✅ All required files are present');
    console.log('✅ Project structure is correct');
    console.log('✅ Configuration files are ready');
    console.log('\n🚀 Next steps:');
    console.log('1. Run: npm install (if not done)');
    console.log('2. Run: npx playwright install');
    console.log('3. Run: npm test');
    console.log('\n📚 Documentation available:');
    console.log('- README.md - Project overview');
    console.log('- MIGRATION_GUIDE.md - Conversion details');
    console.log('- CONVERSION_SUMMARY.md - This summary');
} else {
    console.log('❌ SETUP VERIFICATION: ISSUES FOUND');
    console.log('\nSome required files or configurations are missing.');
    console.log('Please check the errors above and ensure all files are present.');
}

console.log('\n' + '='.repeat(50));
console.log('🔗 For help, check README.md or MIGRATION_GUIDE.md');
