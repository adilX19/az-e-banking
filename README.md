# E-Banking Application

## Overview
This is a full-stack e-banking application built using React for the frontend and Django for the backend. The application provides secure authentication using JWT tokens and allows users to manage their banking transactions efficiently.

## Features
- User authentication (Login, Register, Logout) with JWT
- Protected dashboard with user-specific data
- Responsive Material UI Navbar
- Secure API communication with Django backend
- Profile management
- Notifications & Messages (Future enhancement)

## Tech Stack
### Frontend:
- React (Vite)
- Material UI
- Axios for API requests
- React Router for navigation

### Backend:
- Django & Django Rest Framework (DRF)
- JWT Authentication
- PostgreSQL database
- Django CORS Headers

## Installation & Setup
### Prerequisites:
- Node.js & npm installed
- Python & pip installed
- PostgreSQL database set up

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/e-banking-app.git
   cd e-banking-app/backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations & run server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup:
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Authentication Flow
- On successful login, the JWT access and refresh tokens are stored in `localStorage`.
- The access token is used for authenticated requests to the backend.
- When the access token expires, the refresh token is used to get a new access token.
- Logout removes both tokens from `localStorage` and redirects to the login page.

## Protecting Routes in React
Modify `App.js` to include authentication checks:
```jsx
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
  return localStorage.getItem('accessToken') ? children : <Navigate to='/login' />;
};
```

## API Endpoints
### Authentication:
- `POST /authentication/login/` - Login user
- `POST /authentication/register/` - Register user
- `POST /authentication/logout/` - Logout user
- `POST /authentication/refresh/` - Refresh JWT token

### User Data:
- `GET /dashboard/` - Get user dashboard data

## Environment Variables
Create a `.env` file in the backend directory with:
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/e_banking
```

## Deployment
### Backend Deployment:
- Use **Gunicorn** & **Nginx** for production
- Deploy on AWS Lightsail or Heroku

### Frontend Deployment:
- Build React app: `npm run build`
- Serve with **Nginx** or **Vercel**

## Contribution
Feel free to open issues and contribute via pull requests.

## License
This project is licensed under the MIT License.