#!/bin/bash

# Serve the built web app locally for testing
# This script starts a local web server

set -e

echo "🌐 Starting Kastor Data Academy Web Server..."
echo ""

# Check if build exists
if [ ! -d "build/web" ]; then
    echo "❌ Build directory not found!"
    echo "Please run ./build_web.sh first"
    exit 1
fi

echo "📁 Serving from: build/web/"
echo "🔗 Open your browser to: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd build/web
python3 -m http.server 8000
