# Setup Guide

## Overview

This guide explains how to run the GigFlow Smart Leads Dashboard locally for development and testing.

## Prerequisites

Make sure the following are installed:

- Node.js 20 or later
- npm
- MongoDB Atlas account or local MongoDB instance
- Docker and Docker Compose for containerized setup
- Git

## Project Structure

```txt
smart-leads-dashboard/
├── client/
├── server/
├── docs/
├── docker-compose.yml
├── README.md
└── package.json
```

## Environment Variables

Create `.env` files in both `server/` and `client/` directories using the examples below.

### Server `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart-leads
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

### Client `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd smart-leads-dashboard
```

### 2. Install root dependencies if present

```bash
npm install
```

### 3. Install server dependencies

```bash
cd server
npm install
```

### 4. Install client dependencies

```bash
cd ../client
npm install
```

### 5. Run the backend

```bash
cd ../server
npm run dev
```

Backend should start at:

```txt
http://localhost:5000
```

### 6. Run the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend should start at:

```txt
http://localhost:5173
```

## Health Check

Verify backend status:

```http
GET http://localhost:5000/api/v1/health
```

## Demo Authentication Requests

### Register

```http
POST http://localhost:5000/api/v1/auth/register
```

```json
{
  "name": "Yogarathinam",
  "email": "admin@example.com",
  "password": "Password123"
}
```

### Login

```http
POST http://localhost:5000/api/v1/auth/login
```

```json
{
  "email": "admin@example.com",
  "password": "Password123"
}
```

## Docker Setup

If Docker is configured in the project, run:

```bash
docker-compose up --build
```

This typically starts:
- frontend service
- backend service
- MongoDB service, if configured locally through Docker

If the project currently uses MongoDB Atlas, Docker may still be used for frontend and backend containers while Atlas remains the database provider.

## Recommended Run Order

1. Start backend.
2. Start frontend.
3. Register or log in through Postman or UI.
4. Access dashboard.
5. Test leads CRUD, filters, pagination, and export.

## Postman Collection

Import the collection from:

```txt
docs/postman_collection.json
```

Recommended testing order:
1. Health Check
2. Register User
3. Login User
4. Get Current User
5. Create Lead
6. Get Leads
7. Update Lead
8. Delete Lead
9. Export CSV

## Common Scripts

### Server

```bash
npm run dev
npm run build
npm start
```

### Client

```bash
npm run dev
npm run build
npm run preview
```

## Troubleshooting

### MongoDB connection fails

Check:
- `MONGO_URI` is valid
- Atlas network access allows your IP
- database credentials are correct

### JWT authentication fails

Check:
- token is being sent in `Authorization` header
- `JWT_SECRET` is set correctly
- token is not expired

### CORS issues

Check:
- `CLIENT_URL` matches your frontend URL
- backend CORS config includes the frontend origin

### CSV export does not download

Check:
- authenticated request is used
- export endpoint exists
- browser handles blob or file response correctly

### Frontend cannot reach backend

Check:
- `VITE_API_BASE_URL` is correct
- backend is running on port `5000`
- frontend is running on port `5173`

## Production Notes

Before deployment:
- use environment variables for all secrets
- never commit `.env` files
- configure production frontend and backend URLs
- update CORS allowed origins
- verify Docker or hosting configuration
