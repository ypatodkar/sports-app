# 🧪 Quick Test Guide - Google Search Grounding

## ✅ What's Active Now

- ✅ Google Search Grounding enabled in backend
- ✅ Real-time web data integration
- ✅ Improved video URL discovery
- ✅ Better fallback handling for invalid URLs
- ✅ Backend logging for debugging

---

## 🚀 How to Test

### Step 1: Start the Backend (if not running)

```bash
cd backend
node server.js
```

**Expected Output:**
```
✅ Server running on http://localhost:5001
```

### Step 2: Start the Frontend

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
```

### Step 3: Open the App

Navigate to: **http://localhost:5173**

---

## 🔍 Test Cases

### Test 1: Recent Sports Event (Should Trigger Grounding)

**Query:** "NBA playoffs 2025"

**Expected Backend Log:**
```
🔍 Google Search Grounding Used:
Search Queries: ['NBA playoffs 2025 schedule', 'NBA playoffs 2025 results']
Sources Found: 6-10
Source URLs: ['https://www.nba.com/...', 'https://www.espn.com/...']
```

**Expected Frontend:**
- ✅ Up-to-date playoff information
- ✅ Current standings/results
- ✅ Interesting fact about playoffs
- ✅ Embedded YouTube videos or search fallback

---

### Test 2: Current Player Stats (Should Trigger Grounding)

**Query:** "Cristiano Ronaldo 2025 goals"

**Expected Backend Log:**
```
🔍 Google Search Grounding Used:
Search Queries: ['Cristiano Ronaldo 2025 goals statistics', 'Ronaldo Al Nassr 2025']
Sources Found: 7-12
Source URLs: ['https://www.transfermarkt.com/...', 'https://www.goal.com/...']
```

**Expected Frontend:**
- ✅ 2025 season statistics
- ✅ Recent goals table
- ✅ Interesting fact about Ronaldo
- ✅ Video highlights

---

### Test 3: Very Recent Event (Best for Grounding)

**Query:** "IPL 2025 latest match"

**Expected Backend Log:**
```
🔍 Google Search Grounding Used:
Search Queries: ['IPL 2025 latest match result', 'Indian Premier League 2025 today']
Sources Found: 5-8
Source URLs: ['https://www.iplt20.com/...', 'https://www.cricbuzz.com/...']
```

**Expected Frontend:**
- ✅ Latest match details
- ✅ Current tournament standings
- ✅ Recent performance data
- ✅ Match highlights video

---

### Test 4: Historical Query (May Not Trigger Grounding)

**Query:** "Brazil 1970 World Cup squad"

**Expected Backend Log:**
```
💭 Response generated from model knowledge (no search performed)
```

**Why:** Model already knows historical facts well, so it might not search.

---

## 🎥 Video Test Cases

### Test A: Famous Player Highlights

**Query:** "Lionel Messi best goals"

**Check:**
- ✅ Videos section appears
- ✅ 2-3 video cards displayed
- ✅ Videos either:
  - Embed and play (if real URL found) ✅
  - Show clickable search button (if fallback) 🔍
- ✅ Hover effects work
- ✅ "Watch/Search on YouTube" link works

---

### Test B: Recent Tournament

**Query:** "Champions League 2025 final"

**Check:**
- ✅ Real-time tournament data
- ✅ Video clips of key moments
- ✅ Embedded videos play
- ✅ Fallback works if video unavailable

---

## 📊 View Toggle Test

**Query:** Any query (e.g., "Virat Kohli IPL stats")

**Check All View Modes:**

1. **All View** (default)
   - ✅ Shows interesting fact
   - ✅ Shows charts
   - ✅ Shows table
   - ✅ Shows videos

2. **📊 Charts View**
   - ✅ Shows interesting fact
   - ✅ Shows charts only
   - ❌ Hides table
   - ❌ Hides videos

3. **📋 Table View**
   - ✅ Shows interesting fact
   - ❌ Hides charts
   - ✅ Shows table only
   - ❌ Hides videos

4. **🎥 Videos View**
   - ✅ Shows interesting fact
   - ❌ Hides charts
   - ❌ Hides table
   - ✅ Shows videos only

---

## 🐛 What to Watch For

### Backend Console

**Good Signs:**
```
🔍 Google Search Grounding Used:
Search Queries: [...]
Sources Found: X
```

**Neutral (Not a Problem):**
```
💭 Response generated from model knowledge (no search performed)
```
*This means the model was confident without searching*

**Problem:**
```
API Error: ...
```
*Check your Gemini API key*

---

### Frontend Behavior

**Good:**
- ✅ Interesting facts appear
- ✅ Videos embed properly
- ✅ Fallback "Search on YouTube" works
- ✅ View toggles work smoothly
- ✅ Charts render for numeric data

**Problems:**
- ❌ No interesting fact → Backend might have error
- ❌ Videos section missing → Check `video_clips` in response
- ❌ Charts don't appear → Check if data has numeric columns
- ❌ Blank screen → Check browser console for errors

---

## 🔧 Troubleshooting

### Backend Not Showing Grounding

**Possible Reasons:**
1. Query is historical (model already knows)
2. Query is too vague
3. Model is very confident

**Solution:** Try recent/specific queries like "NBA today" or "Champions League 2025"

---

### Videos Not Embedding

**Possible Reasons:**
1. AI generated invalid URL
2. Video is region-locked
3. Video doesn't allow embedding

**Solution:** Fallback system will show search button - this is **expected behavior**!

---

### No Interesting Fact

**Check:**
1. Backend logs for errors
2. Frontend console for parsing errors
3. Try different query

---

## 📝 Example Test Session

```bash
# Terminal 1: Backend
cd backend
node server.js
# ✅ Server running on http://localhost:5001

# Terminal 2: Frontend
cd frontend
npm run dev
# ➜  Local:   http://localhost:5173/

# Browser: http://localhost:5173
1. Click "⚽ Soccer"
2. Search: "Lionel Messi 2024 stats"
3. Watch backend terminal for grounding logs
4. Check frontend for:
   - ✅ Interesting fact
   - ✅ Charts
   - ✅ Table
   - ✅ Videos
5. Toggle views: All → Charts → Table → Videos
6. Click video to play or search

# Backend Terminal Should Show:
🔍 Google Search Grounding Used:
Search Queries: ['Lionel Messi 2024 statistics', ...]
Sources Found: 8
Source URLs: ['https://www.espn.com/...', ...]
```

---

## 🎯 Success Criteria

### Grounding Works If:
- ✅ Backend logs show "Google Search Grounding Used"
- ✅ Source URLs are logged
- ✅ Data is current/accurate
- ✅ Videos are real (or fallback works)

### Feature Complete If:
- ✅ Interesting facts display
- ✅ Videos section appears
- ✅ View toggle works for all 4 modes
- ✅ Charts render for numeric data
- ✅ Fallback to search works for bad URLs

---

## 📞 Quick Help

**Videos not showing?**
→ Check if `video_clips` field exists in API response

**Grounding not happening?**
→ Try more recent queries (last 6 months)

**Backend errors?**
→ Verify `GEMINI_API_KEY` in `.env` file

**Frontend blank?**
→ Check browser console (F12)

---

## ✅ All Set!

Your Sports App now has:
- 🔍 Real-time data from Google Search
- 🎥 Embedded YouTube videos
- 💡 Interesting AI-generated facts
- 📊 Interactive charts
- 🎛️ Flexible view modes

**Go test it and see the grounding magic in action!** 🚀

---

**Pro Tip:** Keep the backend terminal visible while testing to watch the grounding logs in real-time!

