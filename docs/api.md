# API Documentation

## Overview

GigFlow is a TypeScript-first MERN Lead Management Dashboard built for the ServiceHive Full Stack Internship assignment. The API supports authentication, protected routes, role-aware access control, lead CRUD, pagination, filtering, search, sorting, and CSV export.

## Base URL

```txt
http://localhost:5000/api/v1
```

## Authentication

Protected endpoints require a bearer token.

```txt
Authorization: Bearer <jwt_token>
```

## Standard Response Format

### Success

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "field": "Error message"
  }
}
```

## Status Codes

- `200` Request successful
- `201` Resource created successfully
- `400` Validation or bad request error
- `401` Unauthorized or missing token
- `403` Forbidden
- `404` Resource not found
- `409` Conflict, such as duplicate email
- `500` Internal server error

## Health

### GET `/health`

Checks whether the API server is running.

#### Example Request

```http
GET /api/v1/health
```

#### Example Success Response

```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "status": "ok"
  }
}
```

## Authentication Endpoints

### POST `/auth/register`

Registers a new user account.

#### Request Body

```json
{
  "name": "Yogarathinam",
  "email": "admin@example.com",
  "password": "Password123"
}
```

#### Example Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "6a09b9b445d5281039f375f3",
      "name": "Yogarathinam",
      "email": "admin@example.com",
      "role": "sales",
      "createdAt": "2026-05-17T12:51:00.778Z",
      "updatedAt": "2026-05-17T12:51:00.778Z"
    },
    "token": "<jwt_token>"
  }
}
```

#### Notes

- Passwords are hashed using bcrypt before storage.
- The current implementation defaults registered users to the `sales` role.
- Duplicate email registration should return a conflict or validation error.

### POST `/auth/login`

Authenticates an existing user.

#### Request Body

```json
{
  "email": "admin@example.com",
  "password": "Password123"
}
```

#### Example Success Response

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": "6a09b9b445d5281039f375f3",
      "name": "Yogarathinam",
      "email": "admin@example.com",
      "role": "sales",
      "createdAt": "2026-05-17T12:51:00.778Z",
      "updatedAt": "2026-05-17T12:51:00.778Z"
    },
    "token": "<jwt_token>"
  }
}
```

#### Notes

- JWT token is returned on successful login.
- Invalid email or password should return `401`.

### GET `/auth/me`

Returns the currently authenticated user.

#### Headers

```txt
Authorization: Bearer <jwt_token>
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Current user fetched successfully",
  "data": {
    "id": "6a09b9b445d5281039f375f3",
    "name": "Yogarathinam",
    "email": "admin@example.com",
    "role": "sales",
    "createdAt": "2026-05-17T12:51:00.778Z",
    "updatedAt": "2026-05-17T12:51:00.778Z"
  }
}
```

## Lead Endpoints

### Lead Object

```json
{
  "id": "6a09fa0070285d718a4eb4dd",
  "name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "status": "new",
  "source": "website",
  "createdBy": "6a09b9b445d5281039f375f3",
  "createdAt": "2026-05-17T17:25:20.535Z",
  "updatedAt": "2026-05-17T17:25:20.535Z"
}
```

### Allowed Enums

#### Status

- `new`
- `contacted`
- `qualified`
- `lost`

#### Source

- `website`
- `instagram`
- `referral`

#### Sort

- `latest`
- `oldest`

### POST `/leads`

Creates a new lead.

#### Headers

```txt
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "status": "new",
  "source": "website"
}
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "id": "6a09fa0070285d718a4eb4dd",
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "status": "new",
    "source": "website",
    "createdBy": "6a09b9b445d5281039f375f3",
    "createdAt": "2026-05-17T17:25:20.535Z",
    "updatedAt": "2026-05-17T17:25:20.535Z"
  }
}
```

#### Validation Rules

- `name` is required and should be at least 2 characters.
- `email` must be valid.
- `status` must be one of the allowed enum values.
- `source` must be one of the allowed enum values.

### GET `/leads`

Returns a paginated list of leads with support for filtering, searching, and sorting.

#### Query Parameters

| Param | Type | Required | Description |
|------|------|----------|-------------|
| `page` | number | No | Page number, default `1` |
| `status` | string | No | Filter by lead status |
| `source` | string | No | Filter by lead source |
| `search` | string | No | Search by name or email |
| `sort` | string | No | `latest` or `oldest` |

#### Example Request

```http
GET /api/v1/leads?page=1&status=qualified&source=instagram&search=rahul&sort=latest
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": {
    "items": [
      {
        "id": "6a09fa0070285d718a4eb4dd",
        "name": "Rahul Sharma",
        "email": "rahul.sharma@example.com",
        "status": "new",
        "source": "website",
        "createdBy": "6a09b9b445d5281039f375f3",
        "createdAt": "2026-05-17T17:25:20.535Z",
        "updatedAt": "2026-05-17T17:25:20.535Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 13,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Pagination Notes

- Pagination is handled entirely on the backend.
- Page size is fixed to `10` records.
- Multiple filters work together in one query.

### GET `/leads/:id`

Fetches a single lead by id.

#### Example Request

```http
GET /api/v1/leads/6a09fa0070285d718a4eb4dd
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Lead fetched successfully",
  "data": {
    "id": "6a09fa0070285d718a4eb4dd",
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "status": "new",
    "source": "website",
    "createdBy": "6a09b9b445d5281039f375f3",
    "createdAt": "2026-05-17T17:25:20.535Z",
    "updatedAt": "2026-05-17T17:25:20.535Z"
  }
}
```

### PATCH `/leads/:id`

Updates an existing lead.

#### Request Body

```json
{
  "status": "qualified",
  "source": "instagram"
}
```

#### Example Success Response

```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "id": "6a09fa0070285d718a4eb4dd",
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "status": "qualified",
    "source": "instagram",
    "createdBy": "6a09b9b445d5281039f375f3",
    "createdAt": "2026-05-17T17:25:20.535Z",
    "updatedAt": "2026-05-17T17:30:00.000Z"
  }
}
```

#### Notes

- At least one valid field must be provided.
- Empty update payloads should be rejected.

### DELETE `/leads/:id`

Deletes a lead by id.

#### Example Success Response

```json
{
  "success": true,
  "message": "Lead deleted successfully",
  "data": null
}
```

### GET `/leads/export/csv`

Exports leads in CSV format.

#### Query Parameters

Supports the same filter set as `GET /leads`.

#### Example Request

```http
GET /api/v1/leads/export/csv?status=qualified&sort=latest
```

#### Notes

- Export should respect active filters where implemented.
- Response content type should be CSV.
- This endpoint is typically used by admin users, depending on RBAC rules.

## Postman Collection

The complete Postman collection for this API is available in:

```txt
docs/postman_collection.json
```

It includes ready-to-run requests for auth, health, leads CRUD, pagination, and CSV export.