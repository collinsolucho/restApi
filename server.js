// Import required packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

// Import the User model
const User = require("./models/User");

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// Define port from environment variables or use default
const PORT = process.env.PORT || 3000;

// ==================== ROUTES ====================

// GET: RETURN ALL USERS
app.get("/users", async (req, res) => {
  try {
    // Use mongoose find() method to get all users
    const users = await User.find();

    // Return success response with all users
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// POST: ADD A NEW USER TO THE DATABASE
app.post("/users", async (req, res) => {
  try {
    // Use mongoose create() method to add new user
    const newUser = await User.create(req.body);

    // Return success response with created user
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    // Handle validation errors and other errors
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    } else if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Email already exists",
        error: "Duplicate email field",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    }
  }
});

// PUT: EDIT A USER BY ID
app.put("/users/:id", async (req, res) => {
  try {
    // Use mongoose findByIdAndUpdate() method to edit user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on update
    });

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return success response with updated user
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
});

// DELETE: REMOVE A USER BY ID
app.delete("/users/:id", async (req, res) => {
  try {
    // Use mongoose findByIdAndDelete() method to remove user
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
});

// Root route for testing
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to User Management API",
    endpoints: {
      "GET /users": "Get all users",
      "POST /users": "Create a new user",
      "PUT /users/:id": "Update a user by ID",
      "DELETE /users/:id": "Delete a user by ID",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}`);
  console.log(`📚 API Documentation at http://localhost:${PORT}/`);
});
