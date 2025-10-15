#!/bin/bash

# InvestorOS Setup Script
# Initializes the project for development

echo "🚀 Setting up InvestorOS..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

echo ""
echo "📦 Setting up frontend..."

# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Navigate back to project root
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📊 InvestorOS Platform"
echo ""
echo "  To start the platform:"
echo "  cd frontend && npm run dev"
echo ""
echo "  Access:"
echo "  • Frontend: http://localhost:3000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation: ./docs/"
echo ""
echo "Happy coding! 🚀"