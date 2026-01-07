# Full Stack Project

A modern, production-ready full-stack application built with Next.js, TypeScript, Redux, Node.js, MongoDB, and AWS services.

## 🚀 Features

### Frontend
- **Next.js 16** with TypeScript for type-safe development
- **Redux Toolkit** for predictable state management
- **Tailwind CSS** for responsive, mobile-first design
- **Playwright** for end-to-end testing
- **SEO-friendly** with server-side rendering
- **No inline templates** - properly structured components

### Backend
- **Node.js with Express** for robust API development
- **MongoDB with Mongoose** for flexible data modeling
- **JWT Authentication** with secure password hashing
- **Role-Based Access Control (RBAC)** - user, moderator, admin roles
- **AWS SES Integration** for transactional emails
- **AWS SNS Integration** for push notifications
- **Security features**: Helmet, CORS, rate limiting, input validation

### Security
- JWT-based authentication
- Bcrypt password hashing
- Environment-based configuration
- Input validation and sanitization
- Rate limiting (100 req/15min)
- CORS protection
- Secure headers with Helmet
- MongoDB injection prevention

## 📋 Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v4 or higher
- **AWS Account** (for SES and SNS)
- **Git**

## 🛠️ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd full-stack-project
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed installation and configuration
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deploy to production
- [Backend README](./backend/README.md) - Backend API documentation
- [Frontend README](./frontend/README.md) - Frontend documentation

## 🏗️ Project Structure

```
full-stack-project/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── config/      # Database and app configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth, validation, error handling
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API routes
│   │   ├── services/    # AWS SES, SNS integration
│   │   ├── utils/       # Helper functions
│   │   └── server.js    # Express app entry point
│   ├── scripts/         # Utility scripts
│   └── __tests__/       # Backend tests
│
├── frontend/            # Next.js + TypeScript
│   ├── app/            # Next.js pages (App Router)
│   ├── components/     # React components
│   ├── lib/            # Utilities and Redux store
│   └── tests/          # Playwright tests
│
└── docs/               # Documentation
    ├── SETUP.md
    └── DEPLOYMENT.md
```

## 🔑 Key Features

### Authentication & Authorization
- User registration with email verification support
- Secure login with JWT tokens
- Role-based access control (user, moderator, admin)
- Protected routes and API endpoints

### Email Service (AWS SES)
- Welcome emails on registration
- Password reset emails
- Transactional email support
- HTML email templates

### Push Notifications (AWS SNS)
- User notification system
- Multi-platform support (APNS, GCM)
- Topic-based messaging

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

#### User Management (Admin/Moderator)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test              # Run tests
npm run test:ui       # Interactive mode
npm run test:report   # View report
```

## 📦 Package Backend for Deployment

Create a deployable zip file:
```bash
cd backend
npm run package
```

This creates `dist/backend-api.zip` containing all necessary files.

## 🚀 Deployment

The application can be deployed to:

### Backend
- **Heroku** - Easy PaaS deployment
- **AWS EC2** - Full control with custom configuration
- **Docker** - Containerized deployment

### Frontend
- **Vercel** - Recommended for Next.js (automatic deployments)
- **Netlify** - Easy static site hosting
- **AWS Amplify** - Full-stack AWS integration

### Database
- **MongoDB Atlas** - Managed MongoDB in the cloud (recommended)
- **Self-hosted** - On EC2 or other servers

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🔒 Environment Variables

### Backend
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=your-secret-key
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
SES_FROM_EMAIL=noreply@example.com
SNS_TOPIC_ARN=your-topic-arn
FRONTEND_URL=http://localhost:3000
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🛡️ Security Best Practices

- ✅ Environment-based configuration
- ✅ Secure password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ MongoDB injection prevention
- ✅ HTTPS in production
- ✅ Secure AWS credentials management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

ISC

## 🆘 Support

For issues, questions, or support:

1. Check the [Setup Guide](./docs/SETUP.md)
2. Review [Deployment Guide](./docs/DEPLOYMENT.md)
3. Check backend and frontend README files
4. Review error logs
5. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Add forgot password functionality
- [ ] Implement email verification
- [ ] Add social authentication (Google, GitHub)
- [ ] Implement real-time features with WebSockets
- [ ] Add admin dashboard
- [ ] Implement file upload with AWS S3
- [ ] Add comprehensive API documentation (Swagger)
- [ ] Implement caching with Redis
- [ ] Add CI/CD pipeline
- [ ] Implement monitoring and logging

## 👏 Acknowledgments

Built with modern technologies and best practices:
- Next.js
- TypeScript
- Redux Toolkit
- Node.js
- Express
- MongoDB
- AWS (SES, SNS)
- Tailwind CSS
- Playwright

