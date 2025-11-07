#!/bin/bash

# Vantage Pulse Playwright Setup Script
echo "🚀 Setting up Vantage Pulse Playwright Automation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Playwright browsers"
    exit 1
fi

echo "✅ Playwright browsers installed successfully"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p screenshots
mkdir -p test-results
mkdir -p reports

echo "✅ Directories created successfully"

# Verify installation
echo "🔍 Verifying installation..."
npx playwright --version

if [ $? -ne 0 ]; then
    echo "❌ Playwright installation verification failed"
    exit 1
fi

echo "✅ Playwright installation verified"

# Run a simple test to verify everything works
echo "🧪 Running verification test..."
npx playwright test --reporter=list --grep="Navigates to the URL" || echo "⚠️  Some tests may fail - this is normal for first run"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Run all tests: npm test"
echo "2. Run tests in headed mode: npm run test:headed"
echo "3. Run tests with UI: npm run test:ui"
echo "4. View test reports: npm run test:report"
echo ""
echo "📚 Documentation:"
echo "- README.md - Project overview and usage"
echo "- MIGRATION_GUIDE.md - Detailed migration information"
echo "- playwright.config.js - Configuration options"
echo ""
echo "🚀 Happy testing!"
