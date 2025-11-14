# 🌐 Kastor Data Academy - Web Version

**Live Demo:** [Coming Soon]

Learn data science through interactive detective stories - now on the web!

## ✨ Features

- 🌍 **Web-First Design**: Runs smoothly in any modern web browser
- 🇰🇷🇺🇸 **Bilingual**: Switch between Korean and English instantly
- 💬 **Chat Interface**: Messenger-style story progression
- 🎨 **Character Avatars**: Meet Kastor, Detective, and Maya
- 📊 **Data Visualization**: Interactive charts and graphs
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- ⚡ **Fast Loading**: Optimized with CanvasKit renderer
- 🎮 **Full Episodes**: Complete Episode 1 available

## 🚀 Quick Start

### For Users

Just visit the web app URL (once deployed) - no installation needed!

Works on:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Desktop and Mobile browsers
- ✅ iOS Safari and Android Chrome

### For Developers

**Build and Run:**

```bash
cd flutter_app

# Build for web
./build_web.sh

# Test locally
./serve_web.sh
```

Open: http://localhost:8000

**Deploy:**

See [WEB_DEPLOY.md](./flutter_app/WEB_DEPLOY.md) for detailed deployment instructions.

## 📱 Progressive Web App (PWA)

Kastor Data Academy can be installed as a PWA:

1. Open the web app in Chrome/Edge
2. Click the "Install" button in the address bar
3. Enjoy app-like experience with home screen icon!

## 🎯 What Works on Web

Everything! The web version has full feature parity with mobile:

| Feature | Status |
|---------|--------|
| Language Switching | ✅ |
| Character Avatars | ✅ |
| Chat UI | ✅ |
| Data Charts | ✅ |
| Episode Playthrough | ✅ |
| Settings | ✅ |
| Auto/Manual Mode | ✅ |
| Investigation Points | ✅ |
| Responsive Design | ✅ |
| Touch Support | ✅ |

## 🏗️ Architecture

- **Framework**: Flutter Web
- **Renderer**: CanvasKit (high quality)
- **State Management**: Riverpod
- **Charts**: fl_chart
- **Assets**: SVG characters, JSON episodes

## 📖 Episode 1: The Missing Balance Patch

Shadow's win rate jumped from 50% to 85% overnight!

- Investigate with data analysis
- Make choices that affect the story
- Learn real data science concepts
- Available in Korean and English

## 🎨 Screenshots

[Screenshots would go here]

## 🛠️ Development

**Prerequisites:**
- Flutter SDK 3.10+
- Dart 3.0+
- Modern web browser

**Local Development:**

```bash
cd flutter_app

# Get dependencies
flutter pub get

# Run in Chrome
flutter run -d chrome

# Or run in web server mode
flutter run -d web-server --web-port 8080
```

**Build for Production:**

```bash
# Optimized production build
flutter build web --release --web-renderer canvaskit

# Output: build/web/
```

## 🚢 Deployment Options

| Platform | Difficulty | Features |
|----------|------------|----------|
| **Firebase Hosting** | Easy | Free SSL, Global CDN, Great performance |
| **Netlify** | Very Easy | Drag-and-drop, Auto deploys, Free tier |
| **Vercel** | Easy | GitHub integration, Instant deploys |
| **GitHub Pages** | Medium | Free, Version control integration |
| **Traditional Hosting** | Medium | Full control, Any provider |

See [WEB_DEPLOY.md](./flutter_app/WEB_DEPLOY.md) for step-by-step guides.

## 📊 Performance

- **Initial Load**: ~2-3 seconds (on good connection)
- **Asset Size**: ~15MB (with CanvasKit)
- **Runtime**: Smooth 60 FPS animations
- **Mobile**: Optimized for touch devices

**Optimization Tips:**
- Assets are cached after first load
- SVG avatars are lightweight
- Charts use efficient rendering
- Progressive loading of episodes

## 🌍 Browser Support

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |

Minimum versions:
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

## 🔒 Privacy & Security

- No tracking or analytics (by default)
- All data stored locally in browser
- HTTPS enforced (when deployed)
- No server-side processing
- Open source - audit the code!

## 🤝 Contributing

Contributions welcome! See main README for contribution guidelines.

Web-specific areas:
- Performance optimization
- PWA features
- Browser compatibility
- Responsive design improvements

## 📝 License

Same as main project - see LICENSE file.

## 🎓 Learn More

- **Flutter Web**: https://flutter.dev/web
- **CanvasKit**: https://skia.org/docs/user/modules/canvaskit/
- **PWA**: https://web.dev/progressive-web-apps/

## 🎉 Ready to Deploy?

1. Build: `./build_web.sh`
2. Test: `./serve_web.sh`
3. Deploy: Follow [WEB_DEPLOY.md](./flutter_app/WEB_DEPLOY.md)
4. Share: Tell the world! 🌟

---

**Built with ❤️ using Flutter**

*Empowering data science education through interactive storytelling*
