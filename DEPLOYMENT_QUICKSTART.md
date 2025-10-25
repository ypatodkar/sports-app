# 🚀 Quick Deployment Guide - 30 Minutes to Live!

The fastest way to get your Sports App live on AWS.

---

## 📋 What You'll Need

- ✅ AWS Account (free tier eligible)
- ✅ Gemini API Key
- ✅ 30 minutes
- ✅ Terminal access

---

## 🎯 3-Step Deployment

### Step 1: Deploy Frontend (5 minutes) ⚡

**Option A: Using AWS Amplify (Recommended for beginners)**

1. **Push to GitHub**:
   ```bash
   cd "/Users/yashpatodkar/Documents/Sports App/Sports-app"
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/sports-app.git
   git push -u origin main
   ```

2. **Deploy with Amplify**:
   - Go to: https://console.aws.amazon.com/amplify/
   - Click "New app" → "Host web app"
   - Connect GitHub → Select repository
   - Build settings (paste this):
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
   - Click "Save and deploy"
   - ⏰ Wait 5 minutes
   - 🎉 Get your URL: `https://main.xxxxx.amplifyapp.com`

**Option B: Using Deployment Script**

```bash
# Install AWS CLI (if not installed)
brew install awscli

# Configure AWS
aws configure
# Enter: Access Key, Secret Key, Region (us-east-1)

# Run deployment script
./deploy-to-aws.sh
# Follow prompts
```

---

### Step 2: Deploy Backend (20 minutes) 🖥️

1. **Launch EC2 Instance**:
   - Go to: https://console.aws.amazon.com/ec2/
   - Click "Launch Instance"
   - **Configuration**:
     - Name: `sports-app-backend`
     - AMI: **Ubuntu Server 22.04 LTS**
     - Instance: **t2.micro** (free tier)
     - Create/select key pair (download `.pem`)
     - Security Group → **Edit**:
       - ✅ SSH (22) from My IP
       - ✅ HTTP (80) from Anywhere
       - ✅ Custom TCP (5001) from Anywhere
   - Click "Launch"
   - ⏰ Wait 2 minutes

2. **Setup Backend**:
   ```bash
   # Get your EC2 Public IP from AWS Console
   # Make key file secure
   chmod 400 your-key.pem
   
   # Connect to EC2
   ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
   
   # Run these commands on EC2:
   
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   
   # Clone your repo
   git clone https://github.com/YOUR_USERNAME/sports-app.git
   cd sports-app/backend
   
   # Install dependencies
   npm install
   
   # Create .env file
   nano .env
   # Paste this (replace with YOUR API key):
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   # Press: Ctrl+X, Y, Enter
   
   # Install PM2
   sudo npm install -g pm2
   
   # Start server
   pm2 start server.js --name sports-backend
   pm2 startup
   pm2 save
   
   # Check status
   pm2 status
   ```

3. **Test Backend**:
   ```bash
   # From your local machine:
   curl http://YOUR_EC2_PUBLIC_IP:5001/api/search \
     -H "Content-Type: application/json" \
     -d '{"query":"Messi goals","sport":"Soccer"}'
   
   # Should return JSON data ✅
   ```

---

### Step 3: Connect Frontend to Backend (5 minutes) 🔗

1. **Update Frontend API URL**:
   
   Edit `frontend/src/components/SportPage.tsx` (around line 46):
   ```typescript
   // Change from:
   const response = await fetch('http://localhost:5001/api/search', {
   
   // To:
   const response = await fetch('http://YOUR_EC2_PUBLIC_IP:5001/api/search', {
   ```

2. **Redeploy Frontend**:

   **If using Amplify:**
   ```bash
   git add .
   git commit -m "Update backend URL"
   git push
   # Amplify auto-deploys in 2-3 minutes ✅
   ```

   **If using S3:**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://your-bucket-name/
   ```

---

## ✅ Done! Test Your Live App

1. **Open your frontend URL**:
   - Amplify: `https://main.xxxxx.amplifyapp.com`
   - S3: `http://your-bucket.s3-website-us-east-1.amazonaws.com`

2. **Test the app**:
   - Click "Soccer" ⚽
   - Search: "Lionel Messi career goals"
   - ⏰ Wait 5-10 seconds
   - 🎉 See results with charts and videos!

3. **Check backend logs** (on EC2):
   ```bash
   pm2 logs sports-backend
   # Should see "Google Search Grounding Used" 🔍
   ```

---

## 🔒 Optional: Enable HTTPS (10 minutes)

### For Frontend (CloudFront):

1. **Create CloudFront Distribution**:
   - Go to: https://console.aws.amazon.com/cloudfront/
   - Create distribution → Origin: Your S3 bucket
   - Wait 10 minutes
   - Get HTTPS URL: `https://d123.cloudfront.net`

### For Backend (Let's Encrypt):

```bash
# On EC2:
sudo apt install nginx certbot python3-certbot-nginx -y

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
# Paste (replace YOUR_DOMAIN):
server {
    listen 80;
    server_name api.yourdomain.com;
    location / {
        proxy_pass http://localhost:5001;
    }
}

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com
# Follow prompts

# Frontend now uses: https://api.yourdomain.com/api/search
```

---

## 💰 Cost Breakdown

### First Year (Free Tier):
- ✅ EC2 t2.micro: **FREE** (750 hours/month)
- ✅ S3: **FREE** (5GB storage)
- ✅ CloudFront: **FREE** (50GB transfer)
- ✅ **Total: $0-5/month**

### After Free Tier:
- EC2 t2.micro: **~$8.50/month**
- S3 + CloudFront: **~$2-5/month**
- **Total: ~$10-15/month**

---

## 🐛 Troubleshooting

### Frontend not loading?
```bash
# Check S3 bucket is public
aws s3api get-bucket-policy --bucket your-bucket-name

# Check files uploaded
aws s3 ls s3://your-bucket-name/
```

### Backend not responding?
```bash
# Check EC2 security group allows port 5001
# Check PM2 status on EC2:
pm2 status
pm2 logs sports-backend

# Check if server is running:
curl http://localhost:5001/api/search -d '{"query":"test","sport":"Soccer"}' -H "Content-Type: application/json"
```

### CORS errors?
- Verify backend URL in frontend is correct
- Check EC2 security group allows your frontend domain
- Check browser console for exact error

### "API key not found"?
```bash
# On EC2:
cat ~/sports-app/backend/.env
# Should show: GEMINI_API_KEY=...

# If missing, recreate:
cd ~/sports-app/backend
nano .env
# Add key, save, restart:
pm2 restart sports-backend
```

---

## 📚 Next Steps

### After Basic Deployment:

1. **Setup Custom Domain**:
   - Buy domain (Route 53, Namecheap, etc.)
   - Point to CloudFront/EC2
   - See: `AWS_DEPLOYMENT_GUIDE.md` (Domain section)

2. **Enable Monitoring**:
   - CloudWatch for logs
   - PM2 monitoring: `pm2 plus`
   - Set up alerts

3. **Auto-scaling** (Optional):
   - Load Balancer + Auto Scaling Group
   - For high traffic scenarios

4. **Database** (Optional):
   - Add RDS for search history
   - Store user preferences

---

## 🎯 Quick Commands Reference

### AWS CLI:
```bash
# Configure
aws configure

# List S3 buckets
aws s3 ls

# Upload to S3
aws s3 sync dist/ s3://bucket-name/

# List EC2 instances
aws ec2 describe-instances
```

### EC2 Management:
```bash
# Connect
ssh -i "key.pem" ubuntu@EC2_IP

# Check backend
pm2 status
pm2 logs sports-backend
pm2 restart sports-backend

# Check disk space
df -h

# Check memory
free -h
```

### Update Backend Code:
```bash
# On EC2:
cd ~/sports-app/backend
git pull
npm install  # if package.json changed
pm2 restart sports-backend
```

---

## 🆘 Need Help?

- **Detailed Guide**: See `AWS_DEPLOYMENT_GUIDE.md`
- **AWS Support**: https://console.aws.amazon.com/support/
- **AWS Documentation**: https://docs.aws.amazon.com/
- **Amplify Docs**: https://docs.amplify.aws/

---

## 🎉 Success Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend running on EC2
- [ ] PM2 keeping server alive
- [ ] Frontend can reach backend API
- [ ] Search returns results with:
  - [ ] Charts working
  - [ ] Tables displaying
  - [ ] Videos showing
  - [ ] Interesting facts appearing
- [ ] Google Search Grounding active (check logs)
- [ ] HTTPS enabled (optional but recommended)

---

**Congratulations! Your Sports App is now live on AWS!** 🚀

Share your URL with friends and start exploring sports statistics! ⚽🏏🎾🏀🏎️

---

*Need more control? Check out `AWS_DEPLOYMENT_GUIDE.md` for advanced configurations, serverless options, and production best practices.*

