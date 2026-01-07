# API Documentation

## Base URL

```
http://localhost:5000/api
```

For production, replace with your deployed API URL.

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Error description"
    }
  ]
}
```

## Endpoints

### Health Check

Check if the API is running.

```http
GET /health
```

**Response**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-07T18:00:00.000Z"
}
```

---

## Authentication Endpoints

### Register User

Create a new user account.

```http
POST /api/auth/register
```

**Request Body**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Validation Rules**
- `username`: Required, min 3 characters
- `email`: Required, valid email format
- `password`: Required, min 6 characters
- `firstName`: Optional
- `lastName`: Optional

**Response (201 Created)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4e3a",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "profile": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2024-01-07T18:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400 Bad Request)**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

---

### Login

Authenticate a user and get a JWT token.

```http
POST /api/auth/login
```

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4e3a",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401 Unauthorized)**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Profile

Get the authenticated user's profile.

```http
GET /api/auth/profile
```

**Headers**
```
Authorization: Bearer <token>
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4e3a",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "+1234567890"
      },
      "isActive": true,
      "emailVerified": false,
      "createdAt": "2024-01-07T18:00:00.000Z"
    }
  }
}
```

---

### Update Profile

Update the authenticated user's profile.

```http
PUT /api/auth/profile
```

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4e3a",
      "username": "johndoe",
      "email": "john@example.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "+1234567890"
      }
    }
  }
}
```

---

## User Management Endpoints

All user management endpoints require authentication and specific roles.

### Get All Users

List all users with pagination and filtering.

**Required Role:** Admin or Moderator

```http
GET /api/users?page=1&limit=10&role=user&isActive=true
```

**Headers**
```
Authorization: Bearer <admin-or-moderator-token>
```

**Query Parameters**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10, max: 100)
- `role` (optional): Filter by role (user, admin, moderator)
- `isActive` (optional): Filter by active status (true/false)

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4e3a",
        "username": "johndoe",
        "email": "john@example.com",
        "role": "user",
        "isActive": true,
        "createdAt": "2024-01-07T18:00:00.000Z"
      }
    ],
    "totalPages": 5,
    "currentPage": 1,
    "totalUsers": 48
  }
}
```

---

### Get User by ID

Get details of a specific user.

**Required Role:** Admin or Moderator

```http
GET /api/users/:id
```

**Headers**
```
Authorization: Bearer <admin-or-moderator-token>
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4e3a",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "profile": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "isActive": true,
      "createdAt": "2024-01-07T18:00:00.000Z"
    }
  }
}
```

**Error Response (404 Not Found)**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### Update User

Update a user's role or status.

**Required Role:** Admin

```http
PUT /api/users/:id
```

**Headers**
```
Authorization: Bearer <admin-token>
```

**Request Body**
```json
{
  "role": "moderator",
  "isActive": true
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4e3a",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "moderator",
      "isActive": true
    }
  }
}
```

---

### Delete User

Soft delete a user (sets isActive to false).

**Required Role:** Admin

```http
DELETE /api/users/:id
```

**Headers**
```
Authorization: Bearer <admin-token>
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid or missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limit exceeded) |
| 500 | Internal Server Error |

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Limit:** 100 requests per 15 minutes per IP address
- **Response when exceeded:**
  ```json
  {
    "success": false,
    "message": "Too many requests from this IP, please try again later."
  }
  ```

---

## User Roles

The API implements role-based access control with three roles:

| Role | Description | Permissions |
|------|-------------|-------------|
| **user** | Regular user | Access own profile, update own profile |
| **moderator** | Content moderator | All user permissions + view all users |
| **admin** | Administrator | All permissions + manage users, update roles |

---

## JWT Token

The JWT token contains the following payload:

```json
{
  "id": "60d5ec49f1b2c72b8c8e4e3a",
  "role": "user",
  "iat": 1641513600,
  "exp": 1642118400
}
```

- `id`: User ID
- `role`: User role
- `iat`: Issued at (Unix timestamp)
- `exp`: Expiration time (Unix timestamp)

Token expiration is configurable via `JWT_EXPIRE` environment variable (default: 7 days).

---

## Email Notifications

The API automatically sends emails for:

1. **Welcome Email** - Sent upon successful registration
2. **Password Reset** - Sent when user requests password reset (to be implemented)

Emails are sent using AWS SES.

---

## Push Notifications

The API supports push notifications via AWS SNS for:

1. **Welcome Notification** - Sent upon successful registration
2. **Custom Notifications** - Can be triggered by admin actions

Notifications are sent to subscribed endpoints (email, SMS, mobile apps).

---

## Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get profile:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the collection (create one from this documentation)
2. Set environment variable `baseUrl` to `http://localhost:5000`
3. After login, set `token` variable with the received JWT
4. Use `{{token}}` in Authorization header

---

## Best Practices

1. **Always use HTTPS in production**
2. **Store JWT tokens securely** (httpOnly cookies or secure localStorage)
3. **Handle token expiration** gracefully in your frontend
4. **Validate all inputs** on both client and server
5. **Use appropriate error handling**
6. **Implement request logging** for debugging
7. **Monitor rate limits** to avoid disruption
8. **Rotate secrets** regularly in production

---

## Support

For API issues or questions:
1. Check the backend logs
2. Verify environment configuration
3. Test endpoints with appropriate authentication
4. Review error messages for details
