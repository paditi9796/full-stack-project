# Backend API

Node.js backend API with Express, MongoDB, AWS SES, and AWS SNS integration.

## Features

- **Authentication**: JWT-based authentication with secure password hashing
- **Role-Based Access Control (RBAC)**: Support for user, moderator, and admin roles
- **Email Service**: AWS SES integration for transactional emails
- **Push Notifications**: AWS SNS integration for push notifications
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, input validation
- **Environment Configuration**: Environment-based settings

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- AWS Account (for SES and SNS)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
SES_FROM_EMAIL=noreply@example.com
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:your-topic-name
FRONTEND_URL=http://localhost:3000
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication Routes

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

### User Management Routes (Admin/Moderator)

#### Get All Users
```http
GET /api/users?page=1&limit=10&role=user&isActive=true
Authorization: Bearer <admin/moderator-token>
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <admin/moderator-token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "moderator",
  "isActive": true
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <admin-token>
```

## User Roles

- **user**: Basic user with access to profile management
- **moderator**: Can view and manage users
- **admin**: Full access to all resources

## AWS Configuration

### AWS SES Setup

1. Verify your email address or domain in AWS SES
2. Request production access if needed
3. Update `SES_FROM_EMAIL` in `.env`

### AWS SNS Setup

1. Create an SNS topic in AWS console
2. Subscribe endpoints (email, SMS, mobile push)
3. Update `SNS_TOPIC_ARN` in `.env`

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- CORS configuration
- Input validation and sanitization
- MongoDB injection prevention

## Testing

Run tests:
```bash
npm test
```

## Package for Deployment

Create a deployable zip file:
```bash
npm run package
```

This creates `dist/backend-api.zip` containing all necessary files.

## Deployment

1. Extract the zip file on your server
2. Install dependencies: `npm install --production`
3. Set up environment variables
4. Start the application: `npm start`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 5000) |
| NODE_ENV | Environment mode | Yes |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT | Yes |
| JWT_EXPIRE | Token expiration time | Yes |
| AWS_REGION | AWS region | Yes |
| AWS_ACCESS_KEY_ID | AWS access key | Yes |
| AWS_SECRET_ACCESS_KEY | AWS secret key | Yes |
| SES_FROM_EMAIL | Sender email for SES | Yes |
| SNS_TOPIC_ARN | SNS topic ARN | Yes |
| FRONTEND_URL | Frontend URL for CORS | Yes |

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── notificationService.js
│   ├── utils/
│   │   └── token.js
│   └── server.js
├── scripts/
│   └── package.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## License

ISC
