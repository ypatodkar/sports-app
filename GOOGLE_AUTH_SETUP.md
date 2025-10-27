# Google Authentication Setup Guide

This guide will help you set up Google Authentication with Firebase for your Sports Stats Hub.

## 📋 Prerequisites

- A Google account
- Node.js and npm installed
- The Sports Stats Hub frontend project

## 🔧 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `sports-stats-hub` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

## 🔑 Step 2: Get Firebase Configuration

1. In your Firebase project, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register app name: `Sports Stats Hub`
6. **Don't** check "Set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the `firebaseConfig` object - you'll need these values

## 🔐 Step 3: Enable Google Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"** if first time
3. Go to **"Sign-in method"** tab
4. Click on **"Google"**
5. Toggle **"Enable"**
6. Select a **Project support email** (your email)
7. Click **"Save"**

## 📝 Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select your preferred location (e.g., `us-central`)
5. Click **"Enable"**

### Secure Your Database (Important!)

After testing, update Firestore Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can only read/write their own document
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🌐 Step 5: Configure Your App

### 5.1 Create `.env` file

In `frontend/` directory, create a `.env` file:

```bash
cd frontend
cp .env.example .env
```

### 5.2 Add Firebase Credentials

Edit `.env` and add your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**⚠️ Important**: Never commit `.env` to git!

## 🎯 Step 6: Install Dependencies

The Firebase package should already be installed. If not:

```bash
cd frontend
npm install firebase
```

## 🧪 Step 7: Test Locally

1. Start your development server:
```bash
npm run dev
```

2. Open `http://localhost:5173`
3. You should see the login page
4. Click **"Continue with Google"**
5. Sign in with your Google account
6. You should be redirected to the dashboard

## 📊 Step 8: View Logged Users

To see users who have logged in:

1. Go to **Firebase Console** → **Firestore Database**
2. Click on the **"users"** collection
3. You'll see a document for each user with:
   - `uid`: User's unique ID
   - `email`: User's email
   - `displayName`: User's name
   - `photoURL`: User's profile picture
   - `createdAt`: When they first signed up
   - `lastLogin`: When they last logged in

## 🚀 Step 9: Deploy to Production

### For AWS Amplify:

1. Add environment variables in Amplify Console:
   - Go to **App settings** → **Environment variables**
   - Add each `VITE_FIREBASE_*` variable

2. Redeploy your app

### For other hosting:

Make sure to set environment variables in your hosting platform.

## 🔒 Security Best Practices

### 1. Firestore Security Rules

Update your Firestore rules (go to Firestore → Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. Environment Variables

- ✅ Keep `.env` in `.gitignore`
- ✅ Use environment variables for production
- ✅ Never expose Firebase keys in client code (they're meant to be public but restricted by Firebase rules)

### 3. Authentication Rules

Current setup:
- ✅ Users must sign in with Google to access the app
- ✅ User data is automatically logged to Firestore
- ✅ Last login timestamp is updated on each sign-in

## 📱 Features Included

### ✅ What's Working:

1. **Google Sign-In**: One-click authentication with Google
2. **User Database**: All users automatically logged to Firestore
3. **User Profile**: Display user name and photo in header
4. **Sign Out**: Users can sign out from profile menu
5. **Protected Routes**: App only accessible when logged in
6. **Session Persistence**: Users stay logged in across refreshes

### 🗄️ Database Structure:

```
users (collection)
  └── {userId} (document)
      ├── uid: string
      ├── email: string
      ├── displayName: string
      ├── photoURL: string
      ├── createdAt: timestamp
      └── lastLogin: timestamp
```

## 🐛 Troubleshooting

### Error: "auth/configuration-not-found"
- Make sure Firebase config is correct in `.env`
- Restart dev server after adding `.env` variables

### Error: "auth/unauthorized-domain"
- Add your domain to Firebase Console → Authentication → Settings → Authorized domains
- For localhost: `localhost` should be automatically authorized
- For production: Add your production domain (e.g., `your-app.amplifyapp.com`)

### Users not appearing in Firestore
- Check Firestore rules allow writes
- Check browser console for errors
- Verify Firestore is enabled in Firebase Console

### Can't sign in
- Verify Google auth provider is enabled in Firebase Console
- Check that Firebase API key is correct
- Make sure you're using the correct Firebase project

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)

## 🎉 You're All Set!

Your Sports Stats Hub now has:
- ✅ Google Authentication
- ✅ User tracking in Firestore database
- ✅ Secure user sessions
- ✅ Beautiful login page

Users must now sign in with Google to access your app, and all sign-ins are logged to your Firebase database!

