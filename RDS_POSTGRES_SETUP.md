# AWS RDS PostgreSQL Setup Guide

This guide will help you set up AWS RDS PostgreSQL for your Sports App backend.

## 📋 Prerequisites

- AWS Account
- AWS Console access
- Backend code updated to use PostgreSQL (already done ✅)

---

## 🚀 Step 1: Create RDS PostgreSQL Database

### 1.1 Navigate to RDS Console
Go to: https://us-east-2.console.aws.amazon.com/rds/home?region=us-east-2#launch-dbinstance:

### 1.2 Choose Database Creation Method
- Select: **Standard create**

### 1.3 Engine Options
- **Engine type**: PostgreSQL
- **Engine version**: PostgreSQL 16.x (or latest)
- **Templates**: **Free tier** (if eligible) or **Dev/Test**

### 1.4 Settings
```
DB instance identifier: sports-app-db
Master username: postgres
Master password: [Create a strong password - save this!]
```

**⚠️ IMPORTANT**: Save your password securely! You'll need it for the `.env` file.

### 1.5 Instance Configuration
- **DB instance class**: 
  - Free tier: `db.t3.micro` or `db.t4g.micro`
  - Production: `db.t3.small` or higher

### 1.6 Storage
- **Storage type**: General Purpose SSD (gp3)
- **Allocated storage**: 20 GB (minimum)
- **Enable storage autoscaling**: ✅ (optional but recommended)
- **Maximum storage threshold**: 100 GB

### 1.7 Connectivity
- **Compute resource**: Don't connect to an EC2 compute resource (we'll use Lambda)
- **VPC**: Default VPC
- **Public access**: **Yes** (for now, to allow Lambda access)
  - ⚠️ For production, use VPC peering or private subnets
- **VPC security group**: Create new
  - **New VPC security group name**: `sports-app-db-sg`

### 1.8 Database Authentication
- **Database authentication**: Password authentication

### 1.9 Additional Configuration
- **Initial database name**: `sportsapp` (⚠️ IMPORTANT - enter this!)
- **DB parameter group**: default.postgres16
- **Backup retention period**: 7 days (free tier: 1 day)
- **Enable encryption**: ✅ Yes (default)
- **Enable Performance Insights**: ⚠️ No (not available in free tier)
- **Enable Enhanced monitoring**: ⚠️ No (not available in free tier)

### 1.10 Create Database
- Click **Create database**
- ⏳ Wait 5-10 minutes for the database to be created

---

## 🔧 Step 2: Configure Security Group

### 2.1 Find Your Security Group
1. While the database is being created, go to **EC2 Console** → **Security Groups**
2. Find the security group: `sports-app-db-sg`

### 2.2 Edit Inbound Rules
1. Click on the security group
2. Go to **Inbound rules** tab
3. Click **Edit inbound rules**
4. Click **Add rule**:
   - **Type**: PostgreSQL
   - **Protocol**: TCP
   - **Port**: 5432
   - **Source**: 
     - For testing: `0.0.0.0/0` (anywhere - ⚠️ not recommended for production)
     - For production: Your Lambda's security group or specific IPs

5. Click **Save rules**

---

## 📝 Step 3: Get Database Connection Details

### 3.1 Wait for Database to be Available
- In RDS Console, wait until the status shows **Available** (green)

### 3.2 Get the Endpoint
1. Click on your database instance: `sports-app-db`
2. Under **Connectivity & security**, find:
   - **Endpoint**: `sports-app-db.xxxxxx.us-east-2.rds.amazonaws.com`
   - **Port**: `5432`

3. Copy the endpoint (you'll need this for `.env`)

---

## ⚙️ Step 4: Update Backend Configuration

### 4.1 Create `.env` File
In your `backend/` directory, create a `.env` file:

```bash
cd backend
cp env.template .env
```

### 4.2 Update `.env` with Your RDS Details
```env
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Server Port
PORT=5001

# Node Environment
NODE_ENV=production

# CORS Origin (update for your frontend URL)
CORS_ORIGIN=http://localhost:5173

# AWS RDS PostgreSQL Database Configuration
DB_HOST=sports-app-db.xxxxxx.us-east-2.rds.amazonaws.com
DB_PORT=5432
DB_NAME=sportsapp
DB_USER=postgres
DB_PASSWORD=your_master_password_here

# SSL Configuration (must be 'true' for RDS)
DB_SSL=true
```

**Replace**:
- `sports-app-db.xxxxxx.us-east-2.rds.amazonaws.com` with your actual endpoint
- `your_master_password_here` with the password you set in Step 1.4

---

## 📦 Step 5: Install Dependencies

### 5.1 Remove Old Dependencies
```bash
cd backend
npm uninstall better-sqlite3 sqlite3
```

### 5.2 Install PostgreSQL Client
```bash
npm install pg
```

### 5.3 Update package-lock.json
```bash
npm install
```

---

## 🧪 Step 6: Test Database Connection Locally

### 6.1 Start Your Backend
```bash
cd backend
npm start
```

You should see:
```
✅ PostgreSQL database initialized successfully
Server is running on http://localhost:5001
```

### 6.2 Test User Login Endpoint
In another terminal:
```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test-user-123",
    "email": "test@example.com",
    "displayName": "Test User",
    "photoURL": "https://example.com/photo.jpg"
  }'
```

Expected response:
```json
{
  "message": "New user created",
  "isNewUser": true,
  "loginCount": 1
}
```

### 6.3 Check Database
```bash
curl http://localhost:5001/api/users/stats
```

Expected response:
```json
{
  "totalUsers": 1,
  "todayLogins": 1,
  "newUsersToday": 1
}
```

✅ If you see this, your database is working!

---

## 🔐 Step 7: Update Frontend Configuration

Your frontend needs to point to your backend URL.

### 7.1 Update Frontend `.env`
```bash
cd ../frontend
```

Create or update `.env`:
```env
# Firebase Configuration (for Google Auth)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Backend URL (update when deployed to Lambda)
VITE_BACKEND_URL=http://localhost:5001
```

---

## 🚀 Step 8: Deploy to AWS Lambda

### 8.1 Prepare Lambda Package

Your backend needs to be wrapped for Lambda. Install serverless-http:

```bash
cd backend
npm install serverless-http
```

### 8.2 Create Lambda Handler

Create `backend/lambda.js`:

```javascript
import serverlessHttp from 'serverless-http';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fetch from 'node-fetch';
import { logUserLogin, getAllUsers, getUserStats } from './userController.js';
import './database.js';

const app = express();
app.use(cors());
app.use(express.json());

// User authentication endpoints
app.post('/api/users/login', logUserLogin);
app.get('/api/users', getAllUsers);
app.get('/api/users/stats', getUserStats);

// Sports search endpoint
app.post('/api/search', async (req, res) => {
  // ... your existing search code ...
});

// Export Lambda handler
export const handler = serverlessHttp(app);
```

### 8.3 Set Environment Variables in Lambda

In AWS Lambda Console:
1. Go to your Lambda function
2. **Configuration** → **Environment variables**
3. Add all variables from your `.env` file:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_SSL`
   - `GEMINI_API_KEY`
   - `NODE_ENV`

### 8.4 Configure Lambda VPC (if needed)

If your RDS is in a private subnet:
1. **Configuration** → **VPC**
2. Select the same VPC as your RDS
3. Select subnets
4. Attach the Lambda security group to RDS security group inbound rules

---

## 💰 Cost Estimates

### Free Tier (First 12 Months)
- **RDS**: 750 hours/month of `db.t3.micro` = **FREE**
- **Storage**: 20 GB = **FREE**
- **Backups**: 20 GB = **FREE**

### After Free Tier
- **db.t3.micro** (1 vCPU, 1 GB RAM): ~$15-20/month
- **Storage** (20 GB): ~$2.30/month
- **Total**: ~$17-22/month

### DynamoDB Alternative (Pay-per-Use)
- **Low traffic** (< 1M requests): ~$1-5/month
- **Medium traffic**: $10-30/month

---

## 🔍 Troubleshooting

### Connection Timeout
- ✅ Check security group allows port 5432
- ✅ Check RDS is publicly accessible (or Lambda is in same VPC)
- ✅ Verify endpoint is correct

### Authentication Failed
- ✅ Verify password is correct
- ✅ Check username is `postgres`
- ✅ Ensure database name is `sportsapp`

### SSL Error
- ✅ Set `DB_SSL=true` in `.env`
- ✅ Ensure `ssl: { rejectUnauthorized: false }` in database.js

### Lambda Timeout
- ✅ Increase Lambda timeout to 30 seconds
- ✅ Configure VPC correctly if RDS is private
- ✅ Use connection pooling (already implemented)

---

## 📚 Next Steps

1. ✅ Database is set up
2. ✅ Backend is connected to PostgreSQL
3. ⬜ Deploy Lambda function
4. ⬜ Deploy frontend to S3/Amplify
5. ⬜ Update frontend to use Lambda URL
6. ⬜ Set up Firebase for Google Authentication
7. ⬜ Test end-to-end

---

## 🆘 Need Help?

### Useful AWS Docs
- [RDS PostgreSQL Setup](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html)
- [Lambda + RDS](https://docs.aws.amazon.com/lambda/latest/dg/services-rds.html)
- [Lambda + VPC](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html)

### Check RDS Status
```bash
aws rds describe-db-instances --db-instance-identifier sports-app-db
```

### Test Connection from Local
```bash
psql -h sports-app-db.xxxxxx.us-east-2.rds.amazonaws.com -U postgres -d sportsapp
```

---

**🎉 Your backend is now ready for AWS Lambda + RDS PostgreSQL!**

