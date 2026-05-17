# Architecture Documentation

## Overview

GigFlow is a full-stack lead management application built using the MERN stack with TypeScript on both the frontend and backend. The project is designed to demonstrate production-oriented engineering practices including authentication, role-based access control, modular backend architecture, reusable frontend components, validation, centralized error handling, backend pagination, debounced search, and CSV export.

## Project Goals

The project aims to satisfy the assignment requirements for a Smart Leads Dashboard by implementing:

- secure JWT-based authentication
- user registration and login
- protected routes
- lead CRUD operations
- advanced filtering and search
- backend pagination
- CSV export
- role-based access control
- responsive dashboard UI
- Docker-ready project structure

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS v4
- Zustand
- TanStack Query
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Zod validation

### Tooling and Delivery

- Docker Compose
- GitHub
- Postman
- Markdown documentation

## Monorepo Structure

```txt
smart-leads-dashboard/
├── client/
├── server/
├── docs/
├── .gitignore
├── docker-compose.yml
├── README.md
└── package.json
```

The repository is divided into three main layers:

- `client/` contains the React frontend
- `server/` contains the Express backend
- `docs/` contains supporting project documentation

## System Architecture

At a high level, the system follows this flow:

1. A user registers or logs in through the frontend.
2. The backend validates input using Zod and authenticates the user.
3. The backend returns a signed JWT token.
4. The frontend stores auth state and sends the token on protected requests.
5. Authenticated users interact with leads APIs.
6. Lead queries are filtered, sorted, and paginated at the backend.
7. The frontend renders dashboard data with loading, empty, and error states.
8. CSV export is handled through a dedicated endpoint.

## Backend Architecture

The backend follows a layered modular structure:

```txt
Routes
→ Controllers
→ Services
→ Models
```

### Routes

Responsible for defining endpoints and attaching middleware.

Examples:
- auth routes
- lead routes
- health route

### Controllers

Responsible for request and response handling. Controllers receive validated input, call services, and return consistent API responses.

### Services

Responsible for business logic.

Examples:
- registering a user
- logging in a user
- building lead filters
- pagination logic
- CSV export generation

### Models

Responsible for MongoDB schema definitions using Mongoose.

Core models:
- `User`
- `Lead`

### Middlewares

Key middleware responsibilities include:
- authentication
- authorization
- request validation
- centralized error handling

### Utilities

Shared utilities support:
- JWT signing and verification
- API error classes
- async wrappers
- pagination metadata construction
- response helpers

## Frontend Architecture

The frontend is structured around reusable components and feature-based state.

### Pages

Route-level pages such as:
- `LoginPage`
- `RegisterPage`
- `DashboardPage`
- `UnauthorizedPage`
- `NotFoundPage`

### Components

Reusable UI and feature components such as:
- `Button`
- `Input`
- `Spinner`
- `AppLayout`
- lead modals
- leads toolbar
- leads table
- pagination component

### State Management

The frontend uses a mixed state strategy:

- Zustand for auth and theme state
- TanStack Query for server state, mutations, and cache invalidation
- local component state for form visibility, selected lead, and UI interactions

### Routing

React Router is used for:
- public routes
- protected routes
- unauthorized access handling
- route guards for dashboard access

## Authentication Design

The application uses JWT-based authentication.

### Flow

1. User submits register or login form.
2. Backend validates request data.
3. Passwords are hashed and compared using bcrypt.
4. Backend issues JWT token containing user identity and role.
5. Frontend stores token and attaches it to future requests.
6. Protected routes verify the token before allowing access.

## RBAC Design

The system currently supports two roles:

- `admin`
- `sales`

Role middleware is designed to support access checks such as:

```ts
authorize(ROLES.ADMIN)
```

Typical policy:
- Admin has full system access.
- Sales users can access dashboard workflows with restricted destructive operations depending on implementation.

## Data Model

### User

Fields:
- `name`
- `email`
- `password`
- `role`
- `createdAt`
- `updatedAt`

### Lead

Fields:
- `name`
- `email`
- `status`
- `source`
- `createdBy`
- `createdAt`
- `updatedAt`

### Lead Enums

Status:
- `new`
- `contacted`
- `qualified`
- `lost`

Source:
- `website`
- `instagram`
- `referral`

## Validation Strategy

The project uses Zod schemas to validate:
- request bodies
- query parameters
- update payloads

This keeps validation centralized, typed, and reusable.

## Error Handling Strategy

The backend uses a custom `ApiError` and centralized error middleware to produce consistent responses. This avoids duplicated try/catch logic in every controller and keeps error formatting predictable for the frontend.

## Pagination and Filtering Design

Lead list fetching is handled at the backend using:
- filter construction
- search over `name` and `email`
- sort by latest or oldest
- skip/limit pagination
- pagination metadata

This ensures scalability and keeps the frontend lightweight.

## CSV Export Design

A dedicated export endpoint returns lead data in CSV format. The export flow is designed to reuse the same filtering logic as the list endpoint where supported.

## Security Practices

The project currently applies these security-oriented practices:
- bcrypt password hashing
- JWT verification middleware
- protected API routes
- duplicate user protection
- env-based secret management
- centralized auth enforcement
- no secrets committed to version control

## Scalability Notes

The project structure supports future enhancements such as:
- refresh tokens
- audit logs
- lead notes and activity history
- team-based permissions
- dashboard analytics
- containerized deployment
- testing with Jest or Vitest

## Documentation and DX

Developer experience is supported by:
- `.env.example`
- markdown docs
- Postman collection
- Docker setup preparation
- clear folder boundaries

## Summary

The architecture is intentionally designed to be interview-friendly, scalable, and aligned with real-world full-stack application structure. It demonstrates clean separation of concerns, TypeScript-first engineering, secure authentication, modular API design, and a maintainable React dashboard workflow.