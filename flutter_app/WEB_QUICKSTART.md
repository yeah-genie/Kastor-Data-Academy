# 🚀 Quick Start - Web Version

Get Kastor Data Academy running on the web in 3 simple steps!

## Step 1: Build

```bash
cd flutter_app
./build_web.sh
```

## Step 2: Test Locally

```bash
./serve_web.sh
```

Open your browser to: **http://localhost:8000**

## Step 3: Deploy (Optional)

Choose your preferred hosting:

### Firebase (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting  # Select build/web as public directory
firebase deploy
```

### Netlify
Just drag and drop the `build/web` folder to [Netlify Drop](https://app.netlify.com/drop)

### GitHub Pages
```bash
npm install -g gh-pages
gh-pages -d build/web
```

## ✅ That's it!

Your Kastor Data Academy is now running on the web with:
- ✨ Language switching (Korean/English)
- 🎨 Character avatars
- 💬 Chat UI
- 📊 Data visualization
- 🎮 Full episode playthrough

## 🔧 Troubleshooting

**Build fails?**
```bash
flutter clean
flutter pub get
flutter build web --release
```

**Need help?** Check [WEB_DEPLOY.md](./WEB_DEPLOY.md) for detailed instructions.

---

**Enjoy! 🎓**
