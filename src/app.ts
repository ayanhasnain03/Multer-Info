import express from "express";
import { rm } from "fs";
import path from "path";
import { connectToDB } from "./models/userSchema.js";
import User from "./models/userSchema.js";
import mongoose from "mongoose";
import { singleUpload } from "./middlewares/multer.js";

const port = 3000;
const app = express();
const URI = "mongodb://localhost:27017/multer"; // Ensure your DB name is correct

// Connect to the database
connectToDB(URI);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.post("/register", singleUpload, async (req, res) => {
  try {
    const { username } = req.body;
    const avatar = req.file ? req.file.filename : null;

    // Check for missing fields
    if (!username || !avatar) {
      return res.status(400).json({
        message: "Please enter all required fields (username and avatar).",
      });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // Create a new user
    await User.create({
      username,
      avatar,
    });

    res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

app.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid User ID format.",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Delete the avatar image if it exists
    if (user.avatar) {
      const avatarPath = path.join(process.cwd(), "uploads", user.avatar);

      rm(avatarPath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({
            message: "Error deleting user avatar.",
          });
        }
        console.log("User avatar deleted.");
      });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);

    res.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

app.put("/profile/:id", singleUpload, async (req, res) => {
  const id = req.params.id;
  const { username } = req.body;
  const avatar = req.file ? req.file.filename : null;

  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({
      message: "user not found",
    });
  if (username) user.username = username;
  if (avatar) {
    const removeOldAvatar = path.join(
      process.cwd(),
      "uploads",
      user.avatar as string
    );
    rm(removeOldAvatar, (err) => {
      if (err)
        return res.status(500).json({
          message: "Image not delete for update",
        });
      console.log("image delete");
    });
    user.avatar = avatar;
  }
  await user.save();
  res.status(200).json({
    message: "user updated",
  });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
