# Deployment Guide

This guide covers deploying the full-stack application to various platforms.

## Table of Contents

1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Database Deployment](#database-deployment)
4. [Environment Configuration](#environment-configuration)

## Backend Deployment

### Option 1: Deploy to Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Create Heroku App**
```bash
cd backend
heroku create your-app-name
```

2. **Add MongoDB Add-on**
```bash
heroku addons:create mongolab:sandbox
```

3. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secure-jwt-secret
heroku config:set JWT_EXPIRE=7d
heroku config:set AWS_REGION=us-east-1
heroku config:set AWS_ACCESS_KEY_ID=your-aws-key
heroku config:set AWS_SECRET_ACCESS_KEY=your-aws-secret
heroku config:set SES_FROM_EMAIL=noreply@example.com
heroku config:set SNS_TOPIC_ARN=your-sns-topic-arn
heroku config:set FRONTEND_URL=https://your-frontend-url.com
```

4. **Deploy**
```bash
git push heroku main
```

5. **Verify Deployment**
```bash
heroku open
heroku logs --tail
```

### Option 2: Deploy to AWS EC2

#### Prerequisites
- AWS account
- EC2 instance (Ubuntu 20.04 or later)
- Domain name (optional)

#### Steps

1. **Connect to EC2 Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Install Node.js and MongoDB**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

3. **Clone and Setup Backend**
```bash
cd /home/ubuntu
git clone <your-repo-url>
cd full-stack-project/backend
npm install --production
```

4. **Create Environment File**
```bash
nano .env
# Add your environment variables
```

5. **Install PM2 for Process Management**
```bash
sudo npm install -g pm2
pm2 start src/server.js --name backend
pm2 startup
pm2 save
```

6. **Configure Nginx as Reverse Proxy**
```bash
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/backend

# Add this configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Configure SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

### Option 3: Deploy with Docker

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Steps

1. **Create Dockerfile for Backend**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]
```

2. **Create docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/fullstack-app
      - JWT_SECRET=${JWT_SECRET}
      - AWS_REGION=${AWS_REGION}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - SES_FROM_EMAIL=${SES_FROM_EMAIL}
      - SNS_TOPIC_ARN=${SNS_TOPIC_ARN}
      - FRONTEND_URL=${FRONTEND_URL}
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

3. **Deploy**
```bash
docker-compose up -d
```

### Package Backend for Distribution

Create a downloadable zip file:

```bash
cd backend
npm run package
```

This creates `dist/backend-api.zip` containing:
- Source code
- package.json
- Configuration files
- README

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

#### Prerequisites
- Vercel account
- GitHub repository

#### Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` directory as root

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` with your backend URL

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

### Option 2: Deploy to Netlify

#### Steps

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the Frontend**
```bash
cd frontend
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

4. **Configure Environment Variables**
   - Go to Netlify Dashboard
   - Site Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`

### Option 3: Deploy to AWS Amplify

#### Steps

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
```

2. **Initialize Amplify**
```bash
cd frontend
amplify init
```

3. **Add Hosting**
```bash
amplify add hosting
```

4. **Deploy**
```bash
amplify publish
```

### Option 4: Deploy with Docker

1. **Create Dockerfile for Frontend**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and Run**
```bash
docker build -t frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=your-api-url frontend
```

## Database Deployment

### Option 1: MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Shared" (free tier)
   - Select region closest to your backend
   - Click "Create Cluster"

3. **Configure Access**
   - Database Access: Create database user
   - Network Access: Add IP whitelist (0.0.0.0/0 for all)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Update `MONGODB_URI` in backend environment

### Option 2: Self-Hosted MongoDB

Follow EC2 deployment steps above for MongoDB installation.

## Environment Configuration

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRE=7d
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
SES_FROM_EMAIL=noreply@yourdomain.com
SNS_TOPIC_ARN=your-production-sns-arn
FRONTEND_URL=https://yourdomain.com
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] SSL/HTTPS is configured
- [ ] CORS settings allow your frontend domain
- [ ] MongoDB connection is secure
- [ ] AWS SES is in production mode (if needed)
- [ ] DNS records are configured
- [ ] Health check endpoints are accessible
- [ ] Error logging is set up
- [ ] Backup strategy is in place
- [ ] Monitoring is configured

## Monitoring and Maintenance

### Application Monitoring

1. **Backend Health Check**
```bash
curl https://your-api-domain.com/health
```

2. **Frontend Health Check**
   - Visit https://your-domain.com
   - Check browser console for errors

### Log Management

#### PM2 Logs (EC2)
```bash
pm2 logs backend
pm2 flush  # Clear logs
```

#### Docker Logs
```bash
docker-compose logs -f backend
```

### Database Backups

#### MongoDB Atlas
- Automatic backups enabled by default
- Configure backup schedule in Atlas dashboard

#### Self-Hosted MongoDB
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/fullstack-app" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/fullstack-app" /backup/20240101
```

## Rollback Strategy

### Vercel/Netlify
- Deployment history available in dashboard
- One-click rollback to previous deployment

### Heroku
```bash
heroku releases
heroku rollback v123
```

### EC2/Docker
```bash
git checkout previous-version
pm2 restart backend
# or
docker-compose down
docker-compose up -d
```

## Troubleshooting

### Backend Not Accessible
- Check firewall rules
- Verify security group settings (AWS)
- Check Nginx configuration
- Verify process is running: `pm2 status`

### Frontend Build Errors
- Clear `.next` directory
- Delete `node_modules` and reinstall
- Check environment variables
- Verify Node.js version compatibility

### Database Connection Issues
- Verify MongoDB is running
- Check IP whitelist (Atlas)
- Verify connection string format
- Check network access rules

## Security Best Practices

1. Use environment variables for sensitive data
2. Enable HTTPS/SSL for all connections
3. Keep dependencies updated
4. Use strong JWT secrets
5. Implement rate limiting
6. Enable CORS only for trusted domains
7. Use MongoDB authentication
8. Regular security audits
9. Monitor logs for suspicious activity
10. Implement proper backup strategy

## Cost Optimization

- Use free tiers when possible (MongoDB Atlas, Vercel, Heroku)
- Enable auto-scaling only when needed
- Use CDN for static assets
- Implement caching strategies
- Monitor AWS billing
- Use reserved instances for predictable workloads

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review error logs
3. Verify environment configuration
4. Check network connectivity
5. Contact platform support if needed
