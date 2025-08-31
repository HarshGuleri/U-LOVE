# U-Love Dating App

A modern dating application built with React frontend and Node.js/Express backend.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   copy .env.example .env
   ```

4. Edit the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ulove
   JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here
   JWT_EXPIRES=7d
   FRONTEND_ORIGIN=http://localhost:3000
   ```

5. Make sure MongoDB is running on your system

6. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Features

- **Dynamic Profile Management**: Users can view and edit their profiles with real-time database updates
- **Authentication**: JWT-based authentication with email verification
- **Profile Fields**: Name, email, phone, date of birth, gender, location, interests, hobbies, bio, and profile image
- **Password Management**: Secure password change functionality
- **Responsive Design**: Mobile-friendly interface

## API Endpoints

### Profile Routes
- `GET /api/profile` - Get current user's profile
- `PUT /api/profile` - Update user profile
- `PUT /api/profile/password` - Change user password

### Authentication Routes
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/login` - User login
- `POST /api/auth/resend-otp` - Resend OTP

## Troubleshooting

If you see "Failed to load profile" error:
1. Ensure backend server is running on port 5000
2. Check that MongoDB is connected
3. Verify JWT_SECRET is set in .env file
4. Make sure you're logged in and have a valid token in localStorage
