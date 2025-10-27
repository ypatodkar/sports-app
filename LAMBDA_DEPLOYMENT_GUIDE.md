# AWS Lambda Deployment Guide

This guide will help you deploy your Sports App backend to AWS Lambda with RDS PostgreSQL.

---

## 📋 Prerequisites

- ✅ RDS PostgreSQL database created and running
- ✅ Local testing successful (`npm start` works)
- ✅ AWS Account with Lambda access
- ✅ Backend code ready (lambda.js created)

---

## 🚀 Deployment Options

### **Option 1: AWS Console (Easiest - Recommended for First Time)**
Upload a ZIP file through the browser

### **Option 2: AWS CLI**
Deploy from command line

### **Option 3: Serverless Framework**
Use serverless.yml for automated deployments

We'll start with **Option 1** (Console) as it's the easiest.

---

## 📦 Step 1: Package Your Lambda Function

### 1.1 Create Deployment Package
```bash
cd "/Users/yashpatodkar/Documents/Sports App/V2/sports-app/backend"

# Create a deployment directory
mkdir -p lambda-deploy
cd lambda-deploy

# Copy necessary files
cp ../lambda.js .
cp ../database.js .
cp ../userController.js .
cp ../package.json .
cp ../package-lock.json .

# Install production dependencies (no dev dependencies)
npm install --production

# Remove .env (we'll use Lambda environment variables)
rm -f .env
```

### 1.2 Create ZIP File
```bash
# Create the deployment package
zip -r sports-app-lambda.zip . -x "*.git*" "*.DS_Store"

# Move to backend directory for easy access
mv sports-app-lambda.zip ..
cd ..
```

Your `sports-app-lambda.zip` is now ready! (Should be ~5-10 MB)

---

## ⚡ Step 2: Create Lambda Function

### 2.1 Go to AWS Lambda Console
Open: https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions

### 2.2 Create Function
1. Click **"Create function"** (orange button)

2. Choose:
   - ⚪ **Author from scratch** (selected)

3. Basic information:
   ```
   Function name: sports-app-api
   
   Runtime: Node.js 20.x (or latest Node.js version)
   
   Architecture: x86_64 (default)
   ```

4. Permissions:
   - Expand **"Change default execution role"**
   - ⚪ **Create a new role with basic Lambda permissions** (selected)
   - Role name: `sports-app-lambda-role` (auto-generated)

5. Click **"Create function"** (orange button)

---

## 📤 Step 3: Upload Your Code

### 3.1 Upload ZIP
1. In the Lambda function page, scroll to **"Code source"** section
2. Click **"Upload from"** dropdown
3. Select **".zip file"**
4. Click **"Upload"**
5. Browse and select `sports-app-lambda.zip` from your backend folder
6. Click **"Save"**
7. Wait for upload to complete (may take 30 seconds)

### 3.2 Configure Handler
1. Scroll to **"Runtime settings"** section
2. Click **"Edit"**
3. Change:
   ```
   Runtime: Node.js 20.x
   Handler: lambda.handler
   ```
4. Click **"Save"**

---

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Add Environment Variables
1. Go to **"Configuration"** tab
2. Click **"Environment variables"** (left sidebar)
3. Click **"Edit"**
4. Click **"Add environment variable"** for each:

```
Key: DB_HOST
Value: sports-app-db.xxxxxx.us-east-2.rds.amazonaws.com
(Your RDS endpoint)

Key: DB_PORT
Value: 5432

Key: DB_NAME
Value: sportsapp

Key: DB_USER
Value: postgres

Key: DB_PASSWORD
Value: [Your master password]

Key: DB_SSL
Value: true

Key: GEMINI_API_KEY
Value: [Your Gemini API key]

Key: NODE_ENV
Value: production

Key: CORS_ORIGIN
Value: * 
(Or your frontend URL once deployed)
```

5. Click **"Save"**

---

## ⏱️ Step 5: Increase Timeout & Memory

### 5.1 Configure General Settings
1. Go to **"Configuration"** tab
2. Click **"General configuration"** (left sidebar)
3. Click **"Edit"**
4. Change:
   ```
   Memory: 512 MB (database operations need more memory)
   Timeout: 30 sec (API calls can take time)
   ```
5. Click **"Save"**

---

## 🔗 Step 6: Create Function URL (API Endpoint)

### 6.1 Enable Function URL
1. Go to **"Configuration"** tab
2. Click **"Function URL"** (left sidebar)
3. Click **"Create function URL"**
4. Configure:
   ```
   Auth type: NONE (public access - we handle auth in app)
   
   Configure cross-origin resource sharing (CORS):
     ☑️ Check this box
     
     Allowed origins: *
     (Or specify your frontend domain)
     
     Allowed methods: *
     
     Allowed headers: *
     
     Max age: 86400
   ```
5. Click **"Save"**

### 6.2 Copy Function URL
You'll see something like:
```
https://abc123xyz.lambda-url.us-east-2.on.aws/
```

**Copy this URL** - this is your backend API endpoint! 🎉

---

## 🧪 Step 7: Test Your Lambda Function

### 7.1 Test Health Endpoint
In your terminal:
```bash
curl https://abc123xyz.lambda-url.us-east-2.on.aws/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-10-27T..."
}
```

### 7.2 Test User Login
```bash
curl -X POST https://abc123xyz.lambda-url.us-east-2.on.aws/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "lambda-test-123",
    "email": "lambda@test.com",
    "displayName": "Lambda Test",
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

### 7.3 Test Sports Search
```bash
curl -X POST https://abc123xyz.lambda-url.us-east-2.on.aws/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "sport": "Cricket",
    "query": "Virat Kohli centuries"
  }'
```

Should return stats data!

---

## 🌐 Step 8: Update Frontend to Use Lambda URL

### 8.1 Update Frontend Configuration
```bash
cd ../frontend
```

Edit `src/config/firebase.ts`:

```typescript
// Backend API URL for user logging
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://abc123xyz.lambda-url.us-east-2.on.aws';
```

### 8.2 Update Frontend .env
Create/edit `frontend/.env`:
```env
VITE_BACKEND_URL=https://abc123xyz.lambda-url.us-east-2.on.aws

# Firebase config
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 8.3 Update SportPage.tsx (if needed)
Check `frontend/src/components/SportPage.tsx` - it should use `BACKEND_URL` from config.

Find the line:
```typescript
const apiUrl = 'http://localhost:5001/api/search';
```

Change to:
```typescript
import { BACKEND_URL } from '../config/firebase';
// ...
const apiUrl = `${BACKEND_URL}/api/search`;
```

---

## 📊 Step 9: Monitor Lambda Function

### 9.1 View Logs
1. In Lambda Console, go to **"Monitor"** tab
2. Click **"View CloudWatch logs"**
3. Click on the latest log stream
4. You'll see all console.log outputs and errors

### 9.2 Check Metrics
In **"Monitor"** tab, you can see:
- Invocations (how many requests)
- Duration (how long each request takes)
- Errors (if any failures)
- Throttles (if you hit limits)

---

## 💰 Cost Estimate

### AWS Lambda Pricing (as of 2024)
```
Free Tier (per month, forever):
- 1M requests: FREE
- 400,000 GB-seconds compute: FREE

After Free Tier:
- $0.20 per 1M requests
- $0.0000166667 per GB-second

Example (10,000 requests/month):
- Requests: FREE (under 1M)
- Compute: ~$0.50/month
- Total: ~$0.50/month

Plus RDS: ~$17/month (or FREE in first 12 months)
```

Lambda is essentially **FREE** for low-to-medium traffic!

---

## 🔐 Security Best Practices

### 1. Restrict RDS Access
Update RDS security group to only allow Lambda:
1. Get Lambda security group ID (Configuration → VPC)
2. Update RDS security group inbound rule:
   - Source: Lambda security group (not 0.0.0.0/0)

### 2. Enable VPC (Optional - More Secure)
For production, put Lambda in same VPC as RDS:
1. Configuration → VPC
2. Select your VPC
3. Select subnets (need at least 2 in different AZs)
4. Select security groups
5. Save

⚠️ Note: VPC Lambda needs a NAT Gateway for internet access ($30/month)

### 3. Use Secrets Manager (Optional)
Instead of environment variables, store DB password in AWS Secrets Manager:
- More secure
- Can rotate passwords automatically
- Costs ~$0.40/month per secret

---

## 🔧 Troubleshooting

### Issue 1: "Task timed out after 3.00 seconds"
**Solution**: Increase timeout (Step 5) to 30 seconds

### Issue 2: "Connection timeout" to RDS
**Solutions**:
- Check RDS security group allows Lambda
- Verify RDS is publicly accessible
- Check endpoint in environment variables

### Issue 3: "Cannot find module 'pg'"
**Solution**: Re-create ZIP with `npm install --production`

### Issue 4: CORS errors from frontend
**Solution**: 
- Enable Function URL CORS (Step 6)
- Or add CORS headers in lambda.js

### Issue 5: "Out of memory"
**Solution**: Increase memory (Step 5) to 1024 MB

---

## 🚀 Deployment Automation (Advanced)

### Create GitHub Actions for Auto-Deploy

Create `.github/workflows/deploy-lambda.yml`:

```yaml
name: Deploy to Lambda

on:
  push:
    branches: [ main, Release/* ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd backend
          npm install --production
      
      - name: Package Lambda
        run: |
          cd backend
          zip -r lambda.zip lambda.js database.js userController.js node_modules/
      
      - name: Deploy to Lambda
        uses: appleboy/lambda-action@master
        with:
          aws_access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws_region: us-east-2
          function_name: sports-app-api
          zip_file: backend/lambda.zip
```

---

## ✅ Post-Deployment Checklist

- [ ] Lambda function created
- [ ] Code uploaded and handler configured
- [ ] Environment variables set
- [ ] Timeout increased to 30 seconds
- [ ] Memory increased to 512 MB
- [ ] Function URL created with CORS
- [ ] Health endpoint returns "healthy"
- [ ] User login endpoint works
- [ ] Sports search endpoint works
- [ ] Frontend updated with Lambda URL
- [ ] CloudWatch logs visible
- [ ] RDS security group configured

---

## 📱 Next Steps

1. **Deploy Frontend**:
   - S3 + CloudFront
   - Or Vercel
   - Or AWS Amplify

2. **Set up Custom Domain** (Optional):
   - API Gateway with custom domain
   - Or CloudFront in front of Lambda URL

3. **Set up CI/CD**:
   - GitHub Actions for auto-deploy
   - Or AWS CodePipeline

4. **Monitor & Optimize**:
   - Set up CloudWatch alarms
   - Enable X-Ray tracing
   - Optimize cold starts

---

## 🆘 Need Help?

### AWS Lambda Docs
- [Getting Started](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)
- [Function URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html)
- [RDS with Lambda](https://docs.aws.amazon.com/lambda/latest/dg/services-rds.html)

### Check Lambda Status
```bash
aws lambda get-function --function-name sports-app-api
```

### Update Lambda Code
```bash
aws lambda update-function-code \
  --function-name sports-app-api \
  --zip-file fileb://sports-app-lambda.zip
```

---

**🎉 Your backend is now live on AWS Lambda!**

Lambda URL: `https://abc123xyz.lambda-url.us-east-2.on.aws/`

Now deploy your frontend and connect everything! 🚀

