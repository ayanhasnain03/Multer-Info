import mongoose from "mongoose";

// Function to connect to MongoDB
export const connectToDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Optionally rethrow the error for higher-level handling
  }
};

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, required: false },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
