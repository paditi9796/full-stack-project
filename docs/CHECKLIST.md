# Setup Verification Checklist

Use this checklist to verify your full-stack project setup.

## Prerequisites ✓

- [ ] Node.js v18 or higher installed
- [ ] MongoDB v4 or higher installed (or MongoDB Atlas account)
- [ ] AWS account created
- [ ] Git installed

## Backend Setup ✓

### Installation
- [ ] `cd backend`
- [ ] `npm install` completed without errors
- [ ] `.env` file created from `.env.example`

### Environment Configuration
- [ ] `PORT` set (default: 5000)
- [ ] `NODE_ENV` set to "development"
- [ ] `MONGODB_URI` configured
- [ ] `JWT_SECRET` set (use a strong secret)
- [ ] `JWT_EXPIRE` set (default: 7d)
- [ ] `AWS_REGION` set (e.g., us-east-1)
- [ ] `AWS_ACCESS_KEY_ID` configured
- [ ] `AWS_SECRET_ACCESS_KEY` configured
- [ ] `SES_FROM_EMAIL` set with verified email
- [ ] `SNS_TOPIC_ARN` set (if using SNS)
- [ ] `FRONTEND_URL` set to http://localhost:3000

### Database
- [ ] MongoDB service is running
- [ ] Can connect to MongoDB with configured URI
- [ ] Database `fullstack-app` can be created

### Server
- [ ] `npm run dev` starts without errors
- [ ] Server running on configured port
- [ ] Health check endpoint works: `curl http://localhost:5000/health`
- [ ] Server logs show "MongoDB Connected"

### Tests
- [ ] `npm test` can be run (MongoDB must be running)

## Frontend Setup ✓

### Installation
- [ ] `cd frontend`
- [ ] `npm install` completed without errors
- [ ] `.env.local` file created from `.env.local.example`

### Environment Configuration
- [ ] `NEXT_PUBLIC_API_URL` set to http://localhost:5000/api

### Development Server
- [ ] `npm run dev` starts without errors
- [ ] Frontend running on http://localhost:3000
- [ ] Home page loads correctly
- [ ] No console errors in browser

### Build
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] All pages compile correctly

### Tests
- [ ] Playwright is installed
- [ ] `npm test` can be run (with dev server running)

## AWS Configuration ✓

### SES (Email Service)
- [ ] Email address or domain verified in AWS SES
- [ ] Test email can be sent
- [ ] In production access OR sandbox with verified recipients

### SNS (Push Notifications)
- [ ] SNS topic created
- [ ] Topic ARN obtained
- [ ] Subscriptions created (email, SMS, or app endpoints)
- [ ] Test notification can be sent

### IAM (Credentials)
- [ ] IAM user created
- [ ] User has `AmazonSESFullAccess` policy
- [ ] User has `AmazonSNSFullAccess` policy
- [ ] Access Key ID and Secret Access Key obtained
- [ ] Credentials added to backend `.env`

## Application Testing ✓

### Registration Flow
- [ ] Navigate to http://localhost:3000
- [ ] Click "Get Started"
- [ ] Fill registration form
- [ ] Submit form
- [ ] Registration succeeds
- [ ] Redirected to dashboard
- [ ] User data displayed correctly
- [ ] Welcome email received (if SES configured)

### Login Flow
- [ ] Navigate to http://localhost:3000/login
- [ ] Enter email and password
- [ ] Submit form
- [ ] Login succeeds
- [ ] Token saved in localStorage
- [ ] Redirected to dashboard
- [ ] User data displayed

### Protected Routes
- [ ] Access `/dashboard` without login redirects to login
- [ ] Access `/dashboard` with login shows dashboard
- [ ] Logout button works
- [ ] After logout, dashboard is inaccessible

### API Endpoints
- [ ] POST `/api/auth/register` works
- [ ] POST `/api/auth/login` works
- [ ] GET `/api/auth/profile` works (with token)
- [ ] PUT `/api/auth/profile` works (with token)
- [ ] GET `/api/users` requires admin/moderator role

## Production Readiness ✓

### Security
- [ ] JWT_SECRET is strong (not default)
- [ ] Passwords are hashed (automatic with bcrypt)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Helmet security headers enabled
- [ ] Input validation working
- [ ] Environment variables not committed to Git

### Documentation
- [ ] README.md reviewed
- [ ] SETUP.md followed
- [ ] API_DOCUMENTATION.md reviewed
- [ ] DEPLOYMENT.md reviewed if deploying
- [ ] PROJECT_SUMMARY.md reviewed

### Code Quality
- [ ] No TypeScript errors
- [ ] No console errors (except expected warnings)
- [ ] Build completes successfully
- [ ] Tests configured (can be run)

### Deployment Preparation
- [ ] Backend can be packaged: `npm run package`
- [ ] Environment variables documented
- [ ] Database backup strategy planned
- [ ] Deployment platform selected

## Troubleshooting ✓

### Common Issues Fixed
- [ ] Port conflicts resolved
- [ ] MongoDB connection working
- [ ] AWS credentials valid
- [ ] CORS issues resolved
- [ ] Environment variables loaded

### Resources Available
- [ ] Setup documentation in docs/SETUP.md
- [ ] API documentation in docs/API_DOCUMENTATION.md
- [ ] Deployment guide in docs/DEPLOYMENT.md
- [ ] Project summary in docs/PROJECT_SUMMARY.md

## Next Steps ✓

After completing this checklist:

1. **Development**
   - Start building additional features
   - Add more pages and components
   - Extend API endpoints
   - Write more tests

2. **Testing**
   - Run frontend tests with Playwright
   - Run backend tests with Jest
   - Test all user flows
   - Test error cases

3. **Deployment**
   - Follow DEPLOYMENT.md guide
   - Choose deployment platforms
   - Set up production environment variables
   - Configure production database
   - Enable HTTPS
   - Set up monitoring

4. **Maintenance**
   - Monitor application logs
   - Keep dependencies updated
   - Backup database regularly
   - Monitor AWS usage and costs
   - Review security regularly

## Success Criteria ✓

Your setup is complete when:
- ✅ Both frontend and backend run without errors
- ✅ User can register and login successfully
- ✅ Dashboard displays user information
- ✅ API endpoints respond correctly
- ✅ Documentation is accessible
- ✅ Production build works

## Support

If you encounter issues:
1. Check the SETUP.md guide
2. Review error messages carefully
3. Verify environment variables
4. Check service status (MongoDB, servers)
5. Review documentation

## Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Start development server
npm start           # Start production server
npm test            # Run tests
npm run package     # Create deployment package

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm test            # Run Playwright tests

# MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
# Windows: Start service from Services panel

# Check if services are running
curl http://localhost:5000/health      # Backend health check
curl http://localhost:3000             # Frontend (returns HTML)
```

---

**Once all items are checked, your full-stack project is ready! 🚀**
