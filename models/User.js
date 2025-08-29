// Import mongoose to create the schema and model
const mongoose = require("mongoose");

// Define the User Schema with basic fields
const userSchema = new mongoose.Schema(
  {
    // User's first name - required field
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    // User's last name - required field
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    // User's email - required and unique field
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    // User's age - optional field
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
    },
    // User's phone number - optional field
    phone: {
      type: String,
      trim: true,
    },
  },
  {
    // Add timestamps to automatically track creation and update times
    timestamps: true,
  }
);

// Export the User model
module.exports = mongoose.model("User", userSchema);
