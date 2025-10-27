# Google Auth with SQLite Database Setup

Simple Google authentication with user data stored in SQLite database on your backend.

## 🎯 What You Get

- **Google Sign-In**: One-click authentication
- **SQLite Database**: All user data stored in `backend/users.db`
- **User Tracking**: Login counts, timestamps, user info
- **No Cloud Database**: Everything runs locally or on your server

## 🔧 Quick Setup (10 minutes)

### Step 1: Firebase Setup (For Google OAuth only)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: "sports-stats-hub"
3. Go to **Authentication** → **Sign-in method**
4. Enable **Google** provider
5. Go to **Project Settings** → **General**
6. Scroll to **Your apps** → Click Web icon (`</>`)
7. Register app and copy the config values

### Step 2: Configure Frontend

Create `frontend/.env`:

```env
# Firebase (Only for Google OAuth - no Firestore needed!)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Backend URL (default: http://localhost:5001)
VITE_BACKEND_URL=http://localhost:5001
```

### Step 3: Start Backend

```bash
cd backend
npm install
node server.js
```

The SQLite database will be automatically created at `backend/users.db`

### Step 4: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

### Step 5: Test It!

1. Open `http://localhost:5173`
2. Click "Continue with Google"
3. Sign in with your Google account
4. ✅ Done! You're logged in and saved to SQLite

## 📊 View Your Users

### Option 1: Visit the API

Open in browser: `http://localhost:5001/api/users`

You'll see all users in JSON format:

```json
{
  "total": 1,
  "users": [
    {
      "id": 1,
      "uid": "abc123xyz",
      "email": "user@gmail.com",
      "display_name": "John Doe",
      "photo_url": "https://...",
      "created_at": "2025-01-26 10:30:00",
      "last_login": "2025-01-26 14:20:00",
      "login_count": 5
    }
  ]
}
```

### Option 2: View Stats

`http://localhost:5001/api/users/stats`

```json
{
  "totalUsers": 10,
  "todayLogins": 3,
  "newUsersToday": 1
}
```

### Option 3: Use SQLite Viewer

**Mac/Linux:**
```bash
cd backend
sqlite3 users.db
SELECT * FROM users;
.quit
```

**Windows:**
```bash
cd backend
sqlite3 users.db
SELECT * FROM users;
.quit
```

**Or use a GUI tool:**
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Free)
- [TablePlus](https://tableplus.com/) (Free/Paid)

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  photo_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
  login_count INTEGER DEFAULT 1
)
```

## 🔌 Available API Endpoints

### 1. Log User Login
```
POST /api/users/login

Body:
{
  "uid": "firebase_user_id",
  "email": "user@gmail.com",
  "displayName": "John Doe",
  "photoURL": "https://..."
}

Response:
{
  "message": "User login logged",
  "isNewUser": false,
  "loginCount": 5
}
```

### 2. Get All Users
```
GET /api/users

Response:
{
  "total": 10,
  "users": [...]
}
```

### 3. Get User Stats
```
GET /api/users/stats

Response:
{
  "totalUsers": 10,
  "todayLogins": 3,
  "newUsersToday": 1
}
```

## 🎯 How It Works

1. **User signs in with Google** → Firebase handles OAuth
2. **Frontend gets user info** → uid, email, name, photo
3. **Frontend sends to backend** → POST to `/api/users/login`
4. **Backend saves to SQLite**:
   - New user? Create record with `created_at`
   - Existing user? Update `last_login` and increment `login_count`
5. **User can use app** → Profile shows in header

## 📱 Production Deployment

### Backend (AWS, Heroku, etc.):
1. Deploy backend with SQLite file
2. SQLite database will persist on server filesystem
3. Update `VITE_BACKEND_URL` in frontend env vars

### Frontend (Amplify, Vercel, etc.):
1. Add environment variables:
   - All `VITE_FIREBASE_*` variables
   - `VITE_BACKEND_URL` (your backend URL)
2. Deploy!

**Important**: SQLite database file must be persistent on your backend server. Some hosting platforms use ephemeral storage - consider these:
- ✅ AWS EC2 with EBS
- ✅ DigitalOcean Droplets
- ✅ Heroku with persistent disk add-ons
- ❌ AWS Lambda (use DynamoDB or RDS instead)
- ❌ Vercel/Netlify Edge Functions (use PostgreSQL or MySQL)

## 🔒 Security

### Current Setup:
- ✅ Firebase handles authentication
- ✅ Backend validates incoming data
- ✅ SQLite file only accessible from backend
- ✅ CORS configured for frontend domain

### Production Improvements:
1. **Verify Firebase Tokens**:
```javascript
// Add to backend - verify token from Firebase
import admin from 'firebase-admin';
// Verify ID token in middleware
```

2. **Rate Limiting**:
```javascript
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

3. **Input Validation**:
Already implemented! Backend validates required fields.

## 🎉 Benefits of SQLite

✅ **Simple**: One file, no server setup  
✅ **Fast**: Perfect for small to medium apps  
✅ **Portable**: Easy to backup (just copy the .db file)  
✅ **No Cost**: No cloud database fees  
✅ **Local Development**: Works offline  
✅ **Easy Migration**: Can export to PostgreSQL/MySQL later  

## 📈 When to Upgrade

SQLite works great for:
- Up to **~100K users**
- Up to **~1000 concurrent users**
- Simple queries (like user management)

Upgrade to PostgreSQL/MySQL if:
- You need **more than 100K users**
- You need **complex joins** across many tables
- You need **multiple write-heavy** operations
- You deploy on platforms without persistent storage

## 🐛 Troubleshooting

### "Failed to log user to backend"
- ✅ Backend running? Check `http://localhost:5001`
- ✅ CORS enabled? Backend should allow frontend origin
- ✅ Check backend console for error messages

### "auth/configuration-not-found"
- ✅ Firebase config correct in frontend `.env`?
- ✅ Restart dev server after adding `.env`

### "Database locked"
- SQLite locked if multiple writes happen simultaneously
- Not an issue with this setup (single user writes)
- If needed, use WAL mode: `PRAGMA journal_mode=WAL;`

### Can't see database file
```bash
ls backend/users.db
```
If missing, backend didn't start correctly. Check for errors.

## 📚 What Was Created

### Backend:
- ✅ `backend/database.js` - SQLite setup
- ✅ `backend/userController.js` - User endpoints
- ✅ `backend/server.js` - Updated with user routes
- ✅ `backend/users.db` - Created automatically on first run

### Frontend:
- ✅ `frontend/src/config/firebase.ts` - Auth only (no Firestore)
- ✅ `frontend/src/contexts/AuthContext.tsx` - Sends to backend
- ✅ `frontend/src/components/Login.tsx` - Login page
- ✅ `frontend/src/components/UserProfile.tsx` - Profile dropdown
- ✅ `frontend/src/App.tsx` - Auth protection
- ✅ `frontend/src/main.tsx` - Auth provider

## ✅ Complete!

You now have:
- 🔐 Google Authentication
- 💾 SQLite Database
- 📊 User Tracking
- 📈 Login Analytics
- 🎨 Beautiful Login UI

All user data is safely stored in `backend/users.db` on your server!

