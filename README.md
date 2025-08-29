# User Management REST API

A simple Node.js REST API built with Express and Mongoose for managing users.

## 🚀 Features

- **GET /users** - Retrieve all users
- **POST /users** - Create a new user
- **PUT /users/:id** - Update a user by ID
- **DELETE /users/:id** - Delete a user by ID

## 📁 Project Structure

```
restApi/
├── config/
│   └── .env                 # Environment variables
├── models/
│   └── User.js             # User mongoose model
├── server.js               # Main server file
├── package.json            # Project dependencies
└── README.md              # This file
```

## 🛠️ Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   - The `.env` file is already configured with your MongoDB connection string
   - Server will run on port 3000 by default

3. **Start the server:**
   ```bash
   npm start
   ```

## 🧪 Testing with Postman

### 1. GET /users - Get All Users

- **Method:** GET
- **URL:** `http://localhost:3000/users`
- **Description:** Retrieves all users from the database

### 2. POST /users - Create New User

- **Method:** POST
- **URL:** `http://localhost:3000/users`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "phone": "+1234567890"
  }
  ```

### 3. PUT /users/:id - Update User

- **Method:** PUT
- **URL:** `http://localhost:3000/users/{USER_ID}`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "firstName": "Jane",
    "age": 25
  }
  ```

### 4. DELETE /users/:id - Delete User

- **Method:** DELETE
- **URL:** `http://localhost:3000/users/{USER_ID}`

## 📊 User Schema

The User model includes the following fields:

- `firstName` (required) - User's first name
- `lastName` (required) - User's last name
- `email` (required, unique) - User's email address
- `age` (optional) - User's age
- `phone` (optional) - User's phone number
- `createdAt` (auto-generated) - User creation timestamp
- `updatedAt` (auto-generated) - Last update timestamp

## 🔧 Dependencies

- **express** - Web framework for Node.js
- **mongoose** - MongoDB object modeling tool
- **dotenv** - Environment variables loader

## 🌐 API Endpoints

- **Root:** `GET /` - API information and available endpoints
- **Users:** `GET /users` - Get all users
- **Create:** `POST /users` - Create a new user
- **Update:** `PUT /users/:id` - Update user by ID
- **Delete:** `DELETE /users/:id` - Delete user by ID

## 📝 Notes

- All responses include a `success` boolean flag
- Error responses include detailed error messages
- The API automatically validates data using Mongoose schemas
- Email addresses must be unique across all users
