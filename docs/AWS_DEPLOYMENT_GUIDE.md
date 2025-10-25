# 🚀 AWS Deployment Guide - Sports Stats Hub

Complete guide to deploy your Sports App on AWS with multiple options.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Option 1: Quick Start (AWS Amplify + EC2)](#option-1-quick-start-easiest)
4. [Option 2: Production Setup (S3 + CloudFront + EC2)](#option-2-production-setup)
5. [Option 3: Serverless (S3 + Lambda)](#option-3-serverless-advanced)
6. [Environment Variables Setup](#environment-variables-setup)
7. [Domain & SSL Configuration](#domain--ssl-configuration)
8. [Monitoring & Logging](#monitoring--logging)
9. [Cost Estimation](#cost-estimation)

---

## Prerequisites

### What You Need:
- ✅ AWS Account ([Sign up here](https://aws.amazon.com/))
- ✅ Credit/Debit card for AWS billing
- ✅ Your Gemini API key
- ✅ Basic terminal/command line knowledge
- ✅ (Optional) Domain name for custom URL

### Install AWS CLI:
```bash
# macOS
brew install awscli

# Verify installation
aws --version

# Configure AWS credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region (e.g., us-east-1)
```

---

## Architecture Overview

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────┐
│  CloudFront (CDN) [Optional]    │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Frontend (React)               │
│  - S3 Bucket / Amplify          │
│  - Static Files (HTML/CSS/JS)   │
└──────┬──────────────────────────┘
       │
       │ API Calls
       ↓
┌─────────────────────────────────┐
│  Backend (Node.js/Express)      │
│  - EC2 Instance / Lambda        │
│  - Gemini API Integration       │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│  Gemini API                     │
│  - Google Search Grounding      │
└─────────────────────────────────┘
```

---

## Option 1: Quick Start (Easiest) 🚀

**Best for:** Testing, demos, learning  
**Cost:** ~$10-20/month  
**Time:** 30 minutes

### Frontend: AWS Amplify (Automatic Deployment)

#### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already)
cd "/Users/yashpatodkar/Documents/Sports App/Sports-app"
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/sports-app.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy Frontend with Amplify

1. **Go to AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. **Click "New app" → "Host web app"**
3. **Connect GitHub**: Authorize AWS to access your repo
4. **Select repository**: Choose `sports-app`
5. **Configure build settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - cd frontend
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: frontend/dist
       files:
         - '**/*'
     cache:
       paths:
         - frontend/node_modules/**/*
   ```
6. **Click "Save and deploy"**
7. **Wait 5-10 minutes** - Amplify will build and deploy automatically!
8. **Get your URL**: `https://main.xxxxx.amplifyapp.com`

### Backend: AWS EC2

#### Step 1: Launch EC2 Instance

1. **Go to EC2 Console**: https://console.aws.amazon.com/ec2/
2. **Click "Launch Instance"**
3. **Configuration**:
   - Name: `sports-app-backend`
   - AMI: **Ubuntu Server 22.04 LTS** (Free tier eligible)
   - Instance type: **t2.micro** (Free tier eligible)
   - Key pair: Create new or use existing (download `.pem` file)
   - Security Group: Create new
     - Allow SSH (Port 22) from your IP
     - Allow HTTP (Port 80) from anywhere
     - Allow Custom TCP (Port 5001) from anywhere
   - Storage: 8 GB (default)
4. **Click "Launch Instance"**

#### Step 2: Connect to EC2

```bash
# Change permissions on your key file
chmod 400 your-key.pem

# Connect to EC2
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

#### Step 3: Setup Backend on EC2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install Git
sudo apt install git -y

# Clone your repository
git clone https://github.com/YOUR_USERNAME/sports-app.git
cd sports-app/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add: GEMINI_API_KEY=your_actual_api_key_here
# Press Ctrl+X, then Y, then Enter to save

# Install PM2 (process manager)
sudo npm install -g pm2

# Start server with PM2
pm2 start server.js --name sports-backend

# Make PM2 start on system reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs sports-backend
```

#### Step 4: Configure Backend URL in Frontend

1. **Update frontend to use EC2 IP**:
   ```typescript
   // frontend/src/components/SportPage.tsx
   // Change line ~46:
   const response = await fetch('http://YOUR_EC2_PUBLIC_IP:5001/api/search', {
   ```

2. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Update backend URL"
   git push
   ```

3. **Amplify will auto-redeploy** (wait 2-3 minutes)

### ✅ Done! Your App is Live!

- **Frontend**: `https://main.xxxxx.amplifyapp.com`
- **Backend**: `http://YOUR_EC2_PUBLIC_IP:5001`

---

## Option 2: Production Setup (Recommended) 🏆

**Best for:** Production apps, custom domains  
**Cost:** ~$15-30/month  
**Time:** 1-2 hours

### Frontend: S3 + CloudFront

#### Step 1: Build Frontend

```bash
cd frontend
npm run build
# Creates 'dist' folder with optimized files
```

#### Step 2: Create S3 Bucket

1. **Go to S3 Console**: https://s3.console.aws.amazon.com/
2. **Click "Create bucket"**
3. **Configuration**:
   - Bucket name: `sports-app-frontend` (must be globally unique)
   - Region: `us-east-1` (or your preferred region)
   - **Uncheck "Block all public access"** ⚠️
   - Check "I acknowledge..."
4. **Click "Create bucket"**

#### Step 3: Upload Files

```bash
# Using AWS CLI
aws s3 sync dist/ s3://sports-app-frontend/

# Or use the web console:
# 1. Click on your bucket
# 2. Click "Upload"
# 3. Drag all files from 'dist' folder
# 4. Click "Upload"
```

#### Step 4: Enable Static Website Hosting

1. **Go to bucket → Properties**
2. **Scroll to "Static website hosting"**
3. **Click "Edit"**
4. **Configuration**:
   - Enable: **Static website hosting**
   - Index document: `index.html`
   - Error document: `index.html` (for React Router)
5. **Save changes**
6. **Note the endpoint URL**: `http://sports-app-frontend.s3-website-us-east-1.amazonaws.com`

#### Step 5: Set Bucket Policy (Make Public)

1. **Go to bucket → Permissions**
2. **Bucket Policy → Edit**
3. **Paste this policy**:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::sports-app-frontend/*"
       }
     ]
   }
   ```
4. **Save changes**

#### Step 6: Setup CloudFront (CDN) [Optional but Recommended]

1. **Go to CloudFront Console**: https://console.aws.amazon.com/cloudfront/
2. **Click "Create Distribution"**
3. **Configuration**:
   - Origin domain: Select your S3 bucket
   - Origin path: Leave empty
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Allowed HTTP methods: **GET, HEAD**
   - Default root object: `index.html`
4. **Click "Create Distribution"**
5. **Wait 10-15 minutes** for deployment
6. **Get your CloudFront URL**: `https://d123456abcdef.cloudfront.net`

### Backend: EC2 with Nginx Reverse Proxy

Follow the EC2 setup from Option 1, then add Nginx:

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/sports-backend

# Paste this configuration:
server {
    listen 80;
    server_name YOUR_EC2_PUBLIC_IP;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/sports-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Now your backend is accessible on port 80 (HTTP)
# Update frontend to use: http://YOUR_EC2_PUBLIC_IP/api/search
```

---

## Option 3: Serverless (Advanced) ⚡

**Best for:** High scalability, pay-per-use  
**Cost:** ~$5-15/month (very low traffic)  
**Time:** 2-3 hours

### Frontend: Same as Option 2 (S3 + CloudFront)

### Backend: AWS Lambda + API Gateway

#### Step 1: Prepare Lambda Function

Create `backend/lambda.js`:
```javascript
const serverless = require('serverless-http');
const app = require('./server');

module.exports.handler = serverless(app);
```

Modify `backend/server.js`:
```javascript
// Change the last line from:
// app.listen(5001, ...)

// To:
module.exports = app;  // Export app for Lambda
```

#### Step 2: Install Serverless Framework

```bash
npm install -g serverless
cd backend
npm install serverless-http
```

#### Step 3: Create `serverless.yml`

```yaml
service: sports-app-backend

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  environment:
    GEMINI_API_KEY: ${env:GEMINI_API_KEY}

functions:
  api:
    handler: lambda.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
      - http:
          path: /
          method: ANY
          cors: true

plugins:
  - serverless-offline
```

#### Step 4: Deploy to Lambda

```bash
# Set environment variable
export GEMINI_API_KEY=your_api_key_here

# Deploy
serverless deploy

# Get your API endpoint
# Output: https://abc123.execute-api.us-east-1.amazonaws.com/dev
```

#### Step 5: Update Frontend

```typescript
// Use Lambda API Gateway URL
const response = await fetch('https://abc123.execute-api.us-east-1.amazonaws.com/dev/api/search', {
```

---

## Environment Variables Setup

### For EC2:

```bash
# SSH into EC2
ssh -i "your-key.pem" ubuntu@YOUR_EC2_IP

# Edit .env
cd sports-app/backend
nano .env

# Add:
GEMINI_API_KEY=your_actual_gemini_api_key
PORT=5001
NODE_ENV=production

# Restart server
pm2 restart sports-backend
```

### For Lambda:

```bash
# In serverless.yml
provider:
  environment:
    GEMINI_API_KEY: ${env:GEMINI_API_KEY}

# Or set in AWS Lambda Console:
# Lambda → Functions → Configuration → Environment variables
```

### For Frontend:

```bash
# Create frontend/.env
VITE_API_URL=https://your-backend-url.com

# Use in code:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
```

---

## Domain & SSL Configuration

### Purchase Domain (Optional)

Options:
- **Route 53** (AWS): https://console.aws.amazon.com/route53/
- **Namecheap**: https://www.namecheap.com/
- **GoDaddy**: https://www.godaddy.com/

### Setup Custom Domain for Frontend

#### If using CloudFront:

1. **Get SSL Certificate** (AWS Certificate Manager):
   - Go to ACM Console: https://console.aws.amazon.com/acm/
   - Request certificate
   - Domain: `yourdomain.com`, `www.yourdomain.com`
   - Validation: DNS (add CNAME to Route 53)
   - Wait for validation (~5-10 minutes)

2. **Add to CloudFront**:
   - CloudFront → Distributions → Your distribution → Edit
   - Alternate domain names: `yourdomain.com`, `www.yourdomain.com`
   - SSL Certificate: Select your ACM certificate
   - Save changes

3. **Point Domain to CloudFront**:
   - Route 53 → Hosted zones → Your domain
   - Create record:
     - Type: A
     - Alias: Yes
     - Route traffic to: CloudFront distribution

### Setup Custom Domain for Backend

1. **Associate Elastic IP to EC2** (prevents IP change):
   - EC2 Console → Elastic IPs → Allocate
   - Actions → Associate → Select your EC2

2. **Point Subdomain**:
   - Route 53 → Create record
   - Name: `api.yourdomain.com`
   - Type: A
   - Value: Your Elastic IP

3. **Setup SSL with Let's Encrypt**:
   ```bash
   # SSH into EC2
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d api.yourdomain.com
   # Follow prompts
   
   # Auto-renewal
   sudo certbot renew --dry-run
   ```

---

## Monitoring & Logging

### CloudWatch (AWS Native)

```bash
# Install CloudWatch agent on EC2
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb

# Configure logging
# Go to CloudWatch Console → Logs
# Create log group: /sports-app/backend
```

### PM2 Monitoring

```bash
# On EC2
pm2 logs sports-backend        # View logs
pm2 monit                       # Real-time monitoring
pm2 plus                        # Advanced monitoring (paid)
```

---

## Cost Estimation

### Option 1 (Amplify + EC2):
- **Amplify**: ~$0 (free tier) - $10/month
- **EC2 t2.micro**: $0 (12 months free) - $8.50/month
- **Data transfer**: ~$1-5/month
- **Total**: ~$10-20/month

### Option 2 (S3 + CloudFront + EC2):
- **S3**: ~$0.50/month (for storage)
- **CloudFront**: ~$1-10/month (50GB free)
- **EC2**: $8.50/month (after free tier)
- **Elastic IP**: $0 (while attached)
- **Total**: ~$15-30/month

### Option 3 (Serverless):
- **S3 + CloudFront**: ~$1-10/month
- **Lambda**: $0 (1M requests free) - $5/month
- **API Gateway**: $0 (1M requests free) - $3.50/month
- **Total**: ~$5-20/month

### AWS Free Tier (First 12 Months):
- ✅ EC2 t2.micro: 750 hours/month
- ✅ S3: 5GB storage
- ✅ CloudFront: 50GB data transfer out
- ✅ Lambda: 1M requests, 400,000 GB-seconds compute

---

## Quick Deployment Checklist

### Pre-Deployment:
- [ ] Gemini API key ready
- [ ] AWS account created
- [ ] AWS CLI installed and configured
- [ ] Code pushed to GitHub (for Amplify)

### Frontend:
- [ ] Build runs successfully (`npm run build`)
- [ ] S3 bucket created or Amplify connected
- [ ] Files uploaded
- [ ] Static hosting enabled
- [ ] CloudFront distribution created (optional)

### Backend:
- [ ] EC2 instance launched
- [ ] Node.js installed
- [ ] Dependencies installed
- [ ] .env file configured with API key
- [ ] PM2 running server
- [ ] Security group allows port 5001/80

### Final Steps:
- [ ] Update frontend API URL to backend URL
- [ ] Test all features
- [ ] Setup monitoring/logging
- [ ] Configure custom domain (optional)
- [ ] Setup SSL certificates

---

## Troubleshooting

### Frontend not loading:
- Check S3 bucket policy (must be public)
- Verify index.html is in root of bucket
- Check CloudFront distribution status

### Backend not responding:
- Check EC2 security group (port 5001 open)
- Verify PM2 status: `pm2 status`
- Check logs: `pm2 logs sports-backend`
- Test locally: `curl http://localhost:5001/api/search`

### CORS errors:
- Verify CORS is enabled in backend (already configured)
- Check frontend is using correct backend URL

### Gemini API errors:
- Verify API key in .env file
- Check EC2 has internet access
- View backend logs for API errors

---

## Support Resources

- **AWS Documentation**: https://docs.aws.amazon.com/
- **AWS Free Tier**: https://aws.amazon.com/free/
- **AWS Support**: https://console.aws.amazon.com/support/
- **Amplify Docs**: https://docs.amplify.aws/
- **EC2 Tutorials**: https://aws.amazon.com/ec2/getting-started/

---

## Recommended: Option 1 for Quick Start

Start with **Option 1 (Amplify + EC2)** because:
- ✅ Easiest and fastest (~30 minutes)
- ✅ Automatic deployments from GitHub
- ✅ Good for learning AWS
- ✅ Can easily upgrade to Option 2 later

Once comfortable, migrate to **Option 2** for production!

---

**Next Steps**: Follow Option 1 step-by-step and your app will be live on AWS in 30 minutes! 🚀

