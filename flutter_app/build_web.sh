#!/bin/bash

# Build script for Kastor Data Academy Web Version
# This script builds the Flutter web app with optimizations

set -e  # Exit on error

echo "🚀 Building Kastor Data Academy for Web..."
echo ""

# Check if Flutter is installed
if ! command -v flutter &> /dev/null; then
    echo "❌ Flutter is not installed. Please install Flutter first."
    exit 1
fi

echo "📦 Getting dependencies..."
flutter pub get

echo ""
echo "🔨 Building for web..."
echo "   Renderer: CanvasKit (best quality)"
echo "   Mode: Release"
echo ""

# Build with CanvasKit renderer for better quality
flutter build web \
    --release \
    --web-renderer canvaskit \
    --base-href / \
    --no-tree-shake-icons

echo ""
echo "✅ Build complete!"
echo ""
echo "📁 Output directory: build/web/"
echo ""
echo "To test locally, run:"
echo "   cd build/web && python3 -m http.server 8000"
echo "   Then open: http://localhost:8000"
echo ""
echo "To deploy, upload the contents of build/web/ to your web server"
echo ""
