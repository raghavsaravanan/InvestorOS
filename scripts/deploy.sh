#!/bin/bash

# InvestorOS Deployment Script
# Builds and prepares the application for production

echo "🚀 Building InvestorOS for production..."
echo ""

# Build frontend
echo "📦 Building frontend..."
cd ../frontend
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Navigate back to project root
cd ..

echo ""
echo "🎉 Build complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📊 Production Build Ready"
echo ""
echo "  Files ready for deployment:"
echo "  • Frontend: ./frontend/out/ (static export)"
echo ""
echo "  Next steps:"
echo "  1. Deploy frontend to CDN/hosting (Vercel, Netlify, etc.)"
echo "  2. Configure domain and SSL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 See docs/ for deployment guides"
echo ""
echo "Ready for production! 🚀"

