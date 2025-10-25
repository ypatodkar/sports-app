# ⚡ Sports Stats Hub

> AI-powered sports statistics and analysis at your fingertips

A beautiful, modern web application that uses Google's Gemini AI to provide comprehensive sports statistics across Cricket, Soccer, Tennis, F1, and Basketball.

![Version](https://img.shields.io/badge/version-2.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-19.1.1-61dafb)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)

---

## ✨ Features

### 🎨 Beautiful Modern UI
- Gradient-based design with sport-specific color themes
- Smooth animations and transitions
- Responsive layout for all devices
- Professional typography using Inter font

### 🤖 AI-Powered Analysis with Real-Time Data
- Powered by Google Gemini 2.5 Flash
- **🔍 Google Search Grounding** - Real-time sports data from web sources
- Intelligent sports statistics retrieval with source verification
- Natural language query understanding
- Reduced hallucinations through web-grounded responses
- Structured table results

### 🔍 Smart Search
- Popular search suggestions for each sport
- Recent search history (persists in browser)
- One-click query execution
- Real-time search feedback

### 📊 Comprehensive Stats & Visualizations
- Player career statistics
- Team performance data
- Tournament and championship info
- Head-to-head comparisons
- Historical records
- **Interactive Charts** - Bar, Line, and Radar charts for numeric data
- Multi-metric visualization with automatic chart selection
- Toggle between Table, Chart, and Video views

### 🎥 Video Integration
- **Embedded YouTube Videos** - Watch highlights directly in the app
- AI-curated video clips relevant to your search
- Intelligent fallback to YouTube search
- Direct video embeds with proper aspect ratios

### 💡 Interesting Facts
- AI-generated fascinating facts about searched topics
- Lesser-known achievements and records
- Contextual information to enrich the data

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
cd "Sports-app"
```

2. **Set up Backend**
```bash
cd backend
npm install
```

3. **Create `.env` file in backend folder**
```bash
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "PORT=5001" >> .env
```

4. **Set up Frontend**
```bash
cd ../frontend
npm install
```

### Running the App

1. **Start Backend** (Terminal 1)
```bash
cd backend
node server.js
```
Server runs on: http://localhost:5001

2. **Start Frontend** (Terminal 2)
```bash
cd frontend
npm run dev
```
App runs on: http://localhost:5173

3. **Open your browser** and navigate to http://localhost:5173

---

## 🎯 How to Use

### 1. Choose a Sport
Click on any sport card from the dashboard:
- 🏏 Cricket
- ⚽ Soccer  
- 🎾 Tennis
- 🏎️ F1
- 🏀 Basketball

### 2. Search for Stats
You can:
- **Type your query**: "Virat Kohli IPL 2023 stats"
- **Use suggestions**: Click on popular searches
- **Repeat history**: Click on recent searches

### 3. View Results
- Read the **AI-generated summary** with context
- Check out the **Interesting Fact** - a lesser-known tidbit about your search
- Toggle between different views:
  - **📊 Charts** - Interactive visualizations (Bar, Line, Radar)
  - **📋 Table** - Traditional data table view
  - **🎥 Videos** - Embedded YouTube highlights
  - **All** - See everything at once
- Explore the statistics in your preferred format
- Watch embedded video clips directly in the app

### 4. Real-Time Data
Thanks to **Google Search Grounding**, you get:
- ✅ Up-to-date sports information
- ✅ Recent match results and current standings
- ✅ Real YouTube videos that actually exist
- ✅ Accurate statistics from web sources

---

## 📸 Screenshots

### Dashboard
```
┌─────────────────────────────────────────┐
│     ⚡ Sports Stats Hub                 │
│  AI-powered sports statistics...        │
│                                          │
│  🏏        ⚽        🎾                  │
│ Cricket   Soccer   Tennis               │
│                                          │
│  🏎️        🏀                           │
│   F1    Basketball                      │
│                                          │
│         🚀 Features                      │
│  🤖 AI-Powered  ⚡ Real-Time...         │
└─────────────────────────────────────────┘
```

### Search Page
```
┌─────────────────────────────────────────┐
│  ← Back    🏏 Cricket                   │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Search cricket stats, players...   │ │
│  └────────────────────────────────────┘ │
│         🔍 Search                        │
│                                          │
│  💡 Popular Searches:                   │
│  [ Virat Kohli stats ] [ IPL 2024 ]    │
│                                          │
│  🕐 Recent Searches:                    │
│  • Sachin Tendulkar career stats       │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Chart.js & react-chartjs-2** - Interactive data visualizations
- **CSS-in-JS** - Inline styles with modern design

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Google Gemini 2.5 Flash** - AI analysis
- **🔍 Google Search Grounding** - Real-time web data integration
- **CORS** - Cross-origin requests

### AI Features
- **Gemini API** - Natural language understanding
- **Google Search Tool** - Grounding with real-time sources
- **Structured Output** - JSON-formatted responses
- **Multi-modal Analysis** - Text, tables, and video discovery

---

## 📁 Project Structure

```
Sports-app/
├── frontend/                      # React Frontend
│   ├── src/
│   │   ├── components/           # React components (15+ files)
│   │   ├── styles/               # Styling files
│   │   ├── config/               # Sport configurations
│   │   ├── types/                # TypeScript interfaces
│   │   ├── App.tsx               # Main application component
│   │   ├── index.css             # Global styles & animations
│   │   └── main.tsx              # Application entry point
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                       # Node.js Backend
│   ├── server.js                 # Express server & Gemini AI integration
│   ├── env.template              # Environment variables template
│   ├── .env                      # Your API keys (create this!)
│   └── package.json
│
├── docs/                          # 📚 Documentation (16 files)
│   ├── DEPLOYMENT_QUICKSTART.md  # 30-min deployment guide
│   ├── AWS_DEPLOYMENT_GUIDE.md   # Complete AWS guide
│   ├── GOOGLE_SEARCH_GROUNDING.md # Grounding feature docs
│   ├── VIDEO_CLIPS_FEATURE.md    # Video integration docs
│   ├── MULTI_METRIC_CHARTS.md    # Chart system docs
│   ├── ROADMAP.md                # Future development plans
│   ├── WHATS_NEW.md              # Recent changes log
│   └── ... (more documentation)
│
├── scripts/                       # 🚀 Deployment Scripts
│   └── deploy-to-aws.sh          # Automated AWS deployment
│
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

---

## 🎨 Customization

### Adding New Sports

1. **Update `sportConfig` in App.tsx**:
```typescript
const sportConfig = {
  // ... existing sports
  Hockey: {
    icon: '🏒',
    gradient: 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 100%)',
    suggestions: ['Wayne Gretzky stats', 'Stanley Cup winners', ...]
  }
};
```

2. **Add to sports array**:
```typescript
const sports = ['Cricket', 'Soccer', 'Tennis', 'F1', 'Basketball', 'Hockey'];
```

### Changing Colors

Sport gradients are defined in `sportConfig`:
```typescript
Cricket: { 
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}
```

Use [cssgradient.io](https://cssgradient.io/) to create custom gradients!

### Adding Search Suggestions

Update the `suggestions` array for any sport:
```typescript
Cricket: {
  suggestions: [
    'Your custom suggestion 1',
    'Your custom suggestion 2',
    // Add more...
  ]
}
```

---

## 🔧 Configuration

### Environment Variables

Create `backend/.env`:
```bash
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional
PORT=5001
```

### API Limits
- Gemini API has usage limits
- Free tier: Generous but limited
- Monitor usage in [Google AI Studio](https://makersuite.google.com/)

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy 'dist' folder
```

### Backend (Railway/Render)
```bash
cd backend
# Set environment variables in platform
# Deploy from GitHub repository
```

**Important**: Update API URL in `App.tsx` after deployment:
```typescript
const response = await fetch('https://your-backend-url.com/api/search', {
  // ...
});
```

---

## 📊 Example Queries

### Cricket 🏏
```
✅ "Virat Kohli IPL career stats"
✅ "India vs Australia 2023 World Cup"
✅ "T20 World Cup winners list"
✅ "Sachin Tendulkar test cricket records"
```

### Soccer ⚽
```
✅ "Lionel Messi career goals breakdown"
✅ "Premier League 2024 top scorers"
✅ "Real Madrid Champions League titles"
✅ "World Cup Golden Boot winners"
```

### Tennis 🎾
```
✅ "Novak Djokovic Grand Slam titles"
✅ "Serena Williams career wins"
✅ "Wimbledon champions last 10 years"
✅ "ATP rankings history"
```

### F1 🏎️
```
✅ "Lewis Hamilton race wins by year"
✅ "Monaco Grand Prix winners"
✅ "Max Verstappen 2023 season stats"
✅ "Ferrari constructor championships"
```

### Basketball 🏀
```
✅ "LeBron James career points"
✅ "NBA Finals MVP winners"
✅ "Stephen Curry 3-point records"
✅ "Lakers vs Celtics head to head"
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if .env file exists
ls backend/.env

# Verify API key is set
cat backend/.env

# Check for port conflicts
lsof -i :5001
```

### Frontend shows errors
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API returns errors
- Verify Gemini API key is valid
- Check API quota hasn't exceeded
- Ensure backend URL is correct
- Look at browser console for details

### Search returns "no data"
- Try rephrasing your query
- Be more specific (include years, names)
- Use suggested searches
- Check backend logs for AI response

---

## 🎯 Future Enhancements

See [ROADMAP.md](./ROADMAP.md) for detailed plans including:

- 📊 Data visualization with charts
- 🔴 Live scores and real-time updates
- 👤 User authentication and profiles
- 📰 News integration
- 📱 Mobile app
- 🌐 Multi-language support
- And much more!

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** - AI-powered analysis
- **React** - UI framework
- **Vite** - Lightning-fast build tool
- **Inter Font** - Beautiful typography
- Sports communities worldwide for inspiration

---

## 📧 Contact & Support

- 💬 Issues: [GitHub Issues](https://github.com/yourusername/sports-app/issues)
- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

## 🌟 Show Your Support

If you like this project:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔀 Fork and contribute
- 📢 Share with friends

---

## 📈 Stats

- 🎨 **UI Components**: 15+ modular React components
- 🏆 **Sports Covered**: 5 (Cricket, Soccer, Tennis, F1, Basketball)
- 🤖 **AI Model**: Google Gemini 2.5 Flash with Google Search Grounding
- 📊 **Chart Types**: Bar, Line, Radar (auto-selected per metric)
- 🎥 **Video Integration**: Embedded YouTube player
- 📱 **Responsive**: Mobile, Tablet, Desktop
- ⚡ **Performance**: Lightning fast with optimized rendering

---

## 📚 Additional Documentation

### Features & Updates
- 📘 [**What's New**](./docs/WHATS_NEW.md) - Recent updates and changes
- 🗺️ [**Roadmap**](./docs/ROADMAP.md) - Future development plans
- 🔍 [**Google Search Grounding**](./docs/GOOGLE_SEARCH_GROUNDING.md) - Real-time data integration
- 🎥 [**Video Clips Feature**](./docs/VIDEO_CLIPS_FEATURE.md) - YouTube integration details
- 📊 [**Multi-Metric Charts**](./docs/MULTI_METRIC_CHARTS.md) - Visualization documentation
- 💡 [**Interesting Facts**](./docs/INTERESTING_FACTS_FEATURE.md) - AI-generated insights
- 🧩 [**Component Structure**](./frontend/COMPONENT_STRUCTURE.md) - Architecture overview

### Deployment
- 🚀 [**Quick Deployment (30 min)**](./docs/DEPLOYMENT_QUICKSTART.md) - Get live on AWS fast!
- 📖 [**Complete AWS Guide**](./docs/AWS_DEPLOYMENT_GUIDE.md) - Detailed deployment options
- ⚙️ **Deployment Script**: `./scripts/deploy-to-aws.sh` - Automated frontend deployment

---

## 🌐 Deploy to AWS

Want to make your app live? We've got you covered!

### Quick Start (30 minutes):
```bash
# 1. Deploy frontend with one command
./scripts/deploy-to-aws.sh

# 2. Deploy backend to EC2
# Follow: docs/DEPLOYMENT_QUICKSTART.md

# 3. Your app is live! 🎉
```

### Deployment Options:
1. **AWS Amplify + EC2** - Easiest, ~$10/month
2. **S3 + CloudFront + EC2** - Production-ready, ~$15/month
3. **Serverless (Lambda)** - Scalable, pay-per-use

**See [DEPLOYMENT_QUICKSTART.md](./docs/DEPLOYMENT_QUICKSTART.md) for step-by-step guide!**

---

**Built with ❤️ for sports enthusiasts**

*Last Updated: October 2025*

