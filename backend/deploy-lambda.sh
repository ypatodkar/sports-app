#!/bin/bash

# AWS Lambda Deployment Script for Sports App Backend
# This script packages and deploys the backend to AWS Lambda

set -e  # Exit on any error

echo "🚀 Starting Lambda deployment..."

# Configuration
FUNCTION_NAME="sports-app-backend"  # Change this to your Lambda function name
REGION="us-east-2"  # Change this to your AWS region

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Install with: brew install awscli (macOS) or visit https://aws.amazon.com/cli/"
    exit 1
fi

# Check if user is logged in to AWS
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ Not logged in to AWS. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI is configured${NC}"

# Create deployment directory
echo "📦 Creating deployment package..."
rm -rf lambda-deploy
mkdir -p lambda-deploy

# Copy backend files
echo "📄 Copying backend files..."
cp lambda.js lambda-deploy/
cp database.js lambda-deploy/
cp userController.js lambda-deploy/
cp package.json lambda-deploy/
cp package-lock.json lambda-deploy/

# Navigate to deploy directory
cd lambda-deploy

# Install production dependencies
echo "📥 Installing production dependencies..."
npm ci --production --ignore-scripts

# Create ZIP file
echo "📦 Creating deployment ZIP..."
cd ..
rm -f lambda-deployment.zip
cd lambda-deploy
zip -r ../lambda-deployment.zip . -x "*.git*" -x "*node_modules/.cache*" > /dev/null
cd ..

echo -e "${GREEN}✅ Deployment package created: lambda-deployment.zip${NC}"
echo "📊 Package size: $(du -h lambda-deployment.zip | cut -f1)"

# Update Lambda function
echo "☁️  Uploading to AWS Lambda..."
aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://lambda-deployment.zip \
    --region "$REGION" \
    --no-cli-pager

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Lambda function updated successfully!${NC}"
    
    # Wait for update to complete
    echo "⏳ Waiting for deployment to complete..."
    aws lambda wait function-updated \
        --function-name "$FUNCTION_NAME" \
        --region "$REGION"
    
    echo -e "${GREEN}✅ Deployment complete!${NC}"
    
    # Get function URL
    FUNCTION_URL=$(aws lambda get-function-url-config \
        --function-name "$FUNCTION_NAME" \
        --region "$REGION" \
        --query 'FunctionUrl' \
        --output text 2>/dev/null || echo "No function URL configured")
    
    if [ "$FUNCTION_URL" != "No function URL configured" ]; then
        echo -e "${GREEN}🌐 Function URL: $FUNCTION_URL${NC}"
    fi
    
    # Clean up
    echo "🧹 Cleaning up..."
    rm -rf lambda-deploy
    rm lambda-deployment.zip
    
    echo -e "${GREEN}✅ Cleanup complete!${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Don't forget to update environment variables in Lambda console if needed:${NC}"
    echo "   - GEMINI_API_KEY"
    echo "   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD"
    echo "   - DB_SSL=true"
    echo ""
    echo -e "${GREEN}✅ All done! Your Lambda function is updated.${NC}"
else
    echo -e "${RED}❌ Lambda deployment failed!${NC}"
    rm -rf lambda-deploy
    rm -f lambda-deployment.zip
    exit 1
fi

