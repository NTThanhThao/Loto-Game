# 🎲 Loto Application

A modern Loto (Bingo) game with Vietnamese voice announcements and automated number drawing from 1-90.

## ✨ Features

- Automated random number drawing (1-90, no duplicates)
- Vietnamese voice announcements
- 90-number grid with real-time updates
- Responsive design (desktop, tablet, mobile)
- Regional background variants (Tây, TPHCM, Trung)

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/NTThanhThao/Loto-Game.git
cd loto-app

# Install dependencies
npm install

# Start application
npm start
```

## 📖 Usage

1. Click the gold star "START" button
2. Numbers draw automatically every 5 seconds
3. Toggle voice with button in top-right corner
4. Click home button (top-left) to return to homepage

## 🛠️ Technology Stack

- React - UI framework
- CSS3 - Styling and animations
- Web Speech API - Voice announcements

## 📁 Project Structure

```
loto-app/
├── src/
│   ├── assets
│      ├── Control.js
│      ├── History.js
│      ├── index.js
│      ├── NumberContainer.js
│      ├── VoiceModal.js
│      ├── App.js
│      └── App.css
├── public/
├── test-cases.md
├── test-scenarios.md
└── README.md
```

## 🧪 Testing

Manual test documentation:
- `test-cases.md` - 30 test cases (BVA, EP, functional tests)
- `test-scenarios.md` - 10 test scenarios

## 🌐 Browser Support

✅ Chrome 90+, Firefox 88+, Safari 14+, Edge 90+  
✅ Mobile: iOS 14+, Android 8+

*Voice requires Web Speech API support*

## 📄 License

MIT License

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready
