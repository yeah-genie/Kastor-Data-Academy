# 🌐 Kastor Data Academy - Web Deployment Guide

This guide explains how to build and deploy the Kastor Data Academy web version.

## 📋 Prerequisites

- Flutter SDK (latest stable version)
- A web browser (Chrome, Firefox, Safari, or Edge)
- (Optional) A hosting service account (Firebase, Netlify, Vercel, etc.)

## 🔨 Building for Web

### Quick Build

```bash
cd flutter_app
./build_web.sh
```

### Manual Build

```bash
cd flutter_app

# Get dependencies
flutter pub get

# Build for web
flutter build web --release --web-renderer canvaskit
```

### Build Options

**Renderer Options:**
- `canvaskit` (recommended): Better quality, larger bundle
- `html`: Smaller bundle, faster load, some limitations

```bash
# CanvasKit (recommended for best quality)
flutter build web --web-renderer canvaskit

# HTML renderer (for smaller bundle size)
flutter build web --web-renderer html

# Auto (Flutter decides based on device)
flutter build web --web-renderer auto
```

## 🧪 Testing Locally

After building, test the web app locally:

```bash
cd build/web
python3 -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

### Alternative: Using Flutter's built-in server

```bash
flutter run -d chrome
```

## 🚀 Deployment Options

### Option 1: Firebase Hosting (Recommended)

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project:**
   ```bash
   cd flutter_app
   firebase init hosting
   ```

   When prompted:
   - What do you want to use as your public directory? `build/web`
   - Configure as a single-page app? `Yes`
   - Set up automatic builds and deploys with GitHub? `No` (or Yes if you want CI/CD)

4. **Deploy:**
   ```bash
   ./build_web.sh  # Build first
   firebase deploy --only hosting
   ```

5. **Your app will be live at:**
   `https://your-project-id.web.app`

### Option 2: GitHub Pages

1. **Build the app:**
   ```bash
   ./build_web.sh
   ```

2. **Create a `.nojekyll` file in build/web:**
   ```bash
   touch build/web/.nojekyll
   ```

3. **Deploy to gh-pages branch:**
   ```bash
   # Install gh-pages (if not already)
   npm install -g gh-pages

   # Deploy
   gh-pages -d build/web
   ```

4. **Enable GitHub Pages in your repository settings**

5. **Your app will be live at:**
   `https://your-username.github.io/Kastor-Data-Academy/`

### Option 3: Netlify

1. **Build the app:**
   ```bash
   ./build_web.sh
   ```

2. **Create `netlify.toml` in project root:**
   ```toml
   [build]
     publish = "flutter_app/build/web"
     command = "cd flutter_app && flutter pub get && flutter build web --release"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy:**
   - Drag and drop `build/web` folder to Netlify
   - Or connect your GitHub repo for automatic deployments

### Option 4: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build and deploy:**
   ```bash
   ./build_web.sh
   cd build/web
   vercel
   ```

### Option 5: Traditional Web Hosting

1. **Build the app:**
   ```bash
   ./build_web.sh
   ```

2. **Upload contents of `build/web/` to your web server**

3. **Configure your web server:**
   - All routes should serve `index.html`
   - Enable HTTPS
   - Set proper MIME types

## 🎨 Features Working on Web

✅ **Fully Supported:**
- Language switching (Korean/English)
- Character avatars (SVG rendering)
- Chat UI with all interactions
- Data visualization (fl_chart)
- Episode navigation
- Settings management
- Auto/Manual story progression
- Investigation points tracking

✅ **Optimized for Web:**
- Responsive design (works on mobile, tablet, desktop)
- Fast loading with asset preloading
- Smooth animations
- Touch and mouse input

⚠️ **Platform-Specific Notes:**
- Audio requires user interaction to start (browser restriction)
- File download might behave differently than mobile
- Some mobile-specific features (vibration) may not work

## 📱 Mobile Web Support

The app is fully responsive and works on mobile browsers:

- **iOS Safari** ✅
- **Android Chrome** ✅
- **Mobile Firefox** ✅

Users can add the app to their home screen for an app-like experience.

## 🔧 Troubleshooting

### Build Fails

```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter build web --release
```

### Assets Not Loading

Make sure `pubspec.yaml` includes all assets:
```yaml
flutter:
  assets:
    - assets/sounds/
    - assets/episodes/
    - assets/characters/
    - assets/images/
    - assets/fonts/
```

### White Screen on Load

1. Check browser console for errors
2. Make sure `base href` is set correctly
3. Try different renderer: `flutter build web --web-renderer html`

### Slow Loading

1. Use CanvasKit renderer with split bundles:
   ```bash
   flutter build web --web-renderer canvaskit --split-debug-info=build/debug
   ```

2. Enable caching on your web server

3. Use CDN for static assets

## 📊 Performance Tips

1. **Use CanvasKit for best quality** (recommended for this app)
2. **Enable gzip compression** on your web server
3. **Set proper cache headers** for assets
4. **Use HTTPS** for better performance and security
5. **Consider PWA features** for offline support

## 🌍 Environment Variables

Set base URL for different environments:

```bash
# Production
flutter build web --dart-define=API_URL=https://api.kastor.com

# Development
flutter build web --dart-define=API_URL=http://localhost:3000
```

## 📝 CI/CD Example (GitHub Actions)

Create `.github/workflows/deploy-web.yml`:

```yaml
name: Deploy Web

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.10.0'

    - name: Build Web
      run: |
        cd flutter_app
        flutter pub get
        flutter build web --release --web-renderer canvaskit

    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        channelId: live
        projectId: your-project-id
```

## 🎉 Success!

Your Kastor Data Academy web app should now be live and accessible from any web browser!

For questions or issues, please check:
- Flutter Web documentation: https://flutter.dev/web
- This project's GitHub issues

---

**Happy Teaching! 🎓**
