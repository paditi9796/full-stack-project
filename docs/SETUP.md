# Full Stack Project - Setup Guide

This guide will help you set up and run the full-stack application locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **AWS Account** (for SES and SNS) - [Sign up](https://aws.amazon.com/)

## Project Structure

```
full-stack-project/
├── backend/          # Node.js + Express API
├── frontend/         # Next.js + TypeScript
└── docs/            # Documentation
```

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd full-stack-project
```

## Step 2: Backend Setup

### 2.1 Install Dependencies

```bash
cd backend
npm install
```

### 2.2 Configure Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fullstack-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# AWS SES Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
SES_FROM_EMAIL=noreply@example.com

# AWS SNS Configuration
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:your-topic-name

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 2.3 AWS Configuration

#### AWS SES (Email Service)

1. Log in to AWS Console
2. Navigate to Amazon SES
3. Verify your email address or domain:
   - Click "Verified identities"
   - Click "Create identity"
   - Choose email or domain
   - Complete verification
4. Request production access (optional, for production use)
5. Update `SES_FROM_EMAIL` in `.env` with your verified email

#### AWS SNS (Push Notifications)

1. Log in to AWS Console
2. Navigate to Amazon SNS
3. Create a topic:
   - Click "Topics"
   - Click "Create topic"
   - Choose "Standard" type
   - Name your topic
   - Click "Create topic"
4. Copy the Topic ARN
5. Update `SNS_TOPIC_ARN` in `.env`
6. Create subscriptions (email, SMS, or mobile endpoints)

#### AWS IAM Credentials

1. Log in to AWS Console
2. Navigate to IAM
3. Create a new user:
   - Click "Users" → "Add user"
   - Enable "Programmatic access"
   - Attach policies: `AmazonSESFullAccess` and `AmazonSNSFullAccess`
   - Complete the wizard
4. Save the Access Key ID and Secret Access Key
5. Update `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in `.env`

### 2.4 Start MongoDB

Make sure MongoDB is running:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

### 2.5 Start Backend Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The backend will be available at `http://localhost:5000`.

### 2.6 Test Backend

Check if the server is running:

```bash
curl http://localhost:5000/health
```

You should see a JSON response indicating the server is running.

## Step 3: Frontend Setup

### 3.1 Install Dependencies

In a new terminal window:

```bash
cd frontend
npm install
```

### 3.2 Configure Environment Variables

Create a `.env.local` file from the example:

```bash
cp .env.local.example .env.local
```

Edit the `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3.3 Start Frontend Server

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The frontend will be available at `http://localhost:3000`.

## Step 4: Verify Installation

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the landing page
3. Click "Get Started" to register a new account
4. Fill in the registration form
5. After successful registration, you'll be redirected to the dashboard

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Common Issues and Solutions

### MongoDB Connection Error

**Problem**: `MongoNetworkError: failed to connect to server`

**Solution**: 
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env`
- Verify MongoDB is listening on the correct port

### CORS Error

**Problem**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**:
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Restart the backend server after changing `.env`

### JWT Token Error

**Problem**: `JsonWebTokenError: invalid signature`

**Solution**:
- Ensure `JWT_SECRET` is set in backend `.env`
- Clear browser localStorage and try logging in again

### AWS SES Error

**Problem**: `MessageRejected: Email address is not verified`

**Solution**:
- Verify your email address in AWS SES console
- If in sandbox mode, verify recipient email addresses too
- Request production access for unrestricted sending

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find and kill the process using the port
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Next Steps

- Read the [API Documentation](./API_DOCUMENTATION.md)
- Read the [Deployment Guide](./DEPLOYMENT.md)
- Explore the [Backend README](../backend/README.md)
- Explore the [Frontend README](../frontend/README.md)

## Support

For issues or questions:
1. Check the documentation in the `docs/` directory
2. Review error messages and logs
3. Ensure all prerequisites are installed correctly
4. Verify environment variables are set correctly

## Security Notes

- Never commit `.env` files to version control
- Use strong `JWT_SECRET` in production
- Rotate AWS credentials regularly
- Enable AWS MFA for sensitive operations
- Use HTTPS in production
- Keep dependencies up to date
