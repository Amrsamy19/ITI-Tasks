# Mini BookStore API Specification

## Core Models (MongoDB required)
- **User**: 
  - `username` (unique)
  - `password` (hashed)
  - `role` ("user" | "admin"; default "user")
  - `name` (optional)
- **Book**: 
  - `title` (required),
  - `bookCoverImage` (required),
  - `description` (optional)
  - `genre` (optional)
  - `price` (number >= 0, requird)
  - `publishedYear` (number, optional)
  - `createdBy` (userId)
  - `createdAt`/`updatedAt`

## Authentication (JWT)
- `POST /auth/register` (public)
- `POST /auth/login` (public) → returns `{ token }`
- `GET /users/me` (auth) → returns the current user's data `{userId, username, name}`

## Authorization
- Only endpoints marked **(public)** can be accessed without a token.
- Authentication required for creating/updating/deleting books.
- Only creator OR admin can update/delete a book.


## User Endpoints (Admins only)
- `GET /users` (list all users; admins only)
- `PATCH /users/:id/role` (update user role; admins only; body: `{ "role": "admin" }`)
- `DELETE /users/:id` (delete user; admins only)  

## Books Endpoints
- `POST /books` (auth)
- `GET /books` (public)
  - **Filters & Sorting**
    - `/books?q="any text"` → case-insensitive search by title or description
    - `/books?sort=price` → sort ascending by price
    - `/books?sort=-price` → sort descending by price
    - `/books?q="any text"&sort=price` → combine sort and filter
- `GET /books/:id` (public)
- `PUT /books/:id` (owner or admin)
- `DELETE /books/:id` (owner or admin)

## Validation Rules
- `title` required on create/update
- `price` if provided must be >= 0
- Reject invalid params with 400
- Reject invalid sort value with 400 `{ message:"Invalid sort" }`

## Logging
- Middleware logs each request: `METHOD PATH STATUS` (e.g., `GET /books 200`)

## Architecture
- Follow clean code and project structure (layered Architecture).
- Use environment variables for secrets and configs (DB URI, etc).

## Frontend Pages (minimal)
- Register
- Login
- List Books (search q, filter genre, select sort)
- View Book details
- Create Book (auth)
- Edit/Delete own Book (auth)

## Behavior & Errors
- Invalid Request Paramters → 400 {message: "Invalid request" }
- Non-owner/non-admin modifying/deleting → 403 `{ message:"Forbidden" }`
- Non-existent resource → 404 `{ message:"Not found" }`
- Invalid/expired token → 401 `{ message:"Unauthorized" }`

## Bonus
- Implement pagination for books listing endpoint:
  - `/books?page=1&limit=10` → pagination support
- Add authors entity and endpoints; each book should be related to an author:
  - **Authors Endpoints:**
    - `POST /authors` (admin only)
    - `GET /authors` (public)
    - `GET /authors/:id` (public)
    - `PUT /authors/:id` (admin only)
    - `DELETE /authors/:id` (admin only)