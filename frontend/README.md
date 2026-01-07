# Frontend

Modern Next.js frontend with TypeScript, Redux, and Playwright testing.

## Features

- **Framework**: Next.js 16 with App Router
- **Type Safety**: TypeScript for full type safety
- **State Management**: Redux Toolkit for predictable state management
- **Styling**: Tailwind CSS for responsive design
- **Testing**: Playwright for end-to-end testing
- **SEO**: Built-in Next.js SEO optimization
- **No Inline Templates**: All components are properly structured

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file from example:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

## Testing

### Run Playwright Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

### View Test Report
```bash
npm run test:report
```

## Project Structure

```
frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── ReduxProvider.tsx
├── lib/
│   ├── api/
│   │   ├── auth.ts
│   │   └── axios.ts
│   └── redux/
│       ├── authSlice.ts
│       ├── hooks.ts
│       └── store.ts
├── tests/
│   └── app.spec.ts
├── .env.local.example
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Features Overview

### Authentication

- User registration with validation
- Login/logout functionality
- JWT token management
- Protected routes

### State Management

Redux Toolkit slices:
- **authSlice**: Handles authentication state, user data, and login/logout actions

### Responsive Design

- Mobile-first approach
- Tailwind CSS utility classes
- Responsive navigation
- Adaptive layouts

### SEO Optimization

- Meta tags for all pages
- Semantic HTML structure
- Next.js built-in SEO features
- Server-side rendering

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_API_URL | Backend API URL | Yes |

## Pages

### Home (/)
Landing page with project overview and call-to-action buttons.

### Login (/login)
User authentication page with email and password fields.

### Register (/register)
User registration page with username, email, password, and optional profile fields.

### Dashboard (/dashboard)
Protected dashboard page showing user profile information.

## Components

### Auth Components

- **LoginForm**: Handles user login with form validation
- **RegisterForm**: Handles user registration with form validation

### Layout Components

- **ReduxProvider**: Wraps the app with Redux store provider

## Redux Store

### Auth Slice
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### Actions
- `register`: Register new user
- `login`: Authenticate user
- `logout`: Clear user session
- `getProfile`: Fetch user profile

## API Integration

All API calls use axios with interceptors for:
- Automatic token injection
- Error handling
- Unauthorized redirect

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Keep components small and focused

### Component Structure
- Use client components ('use client') for interactivity
- Use server components by default
- Separate business logic from UI

### State Management
- Use Redux for global state
- Use local state for component-specific data
- Use custom hooks for reusable logic

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

## Deployment

The frontend can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker container

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
