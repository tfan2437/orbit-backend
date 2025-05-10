import { PHOTO_URL } from "../config/env.js";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { uid, email, name, photo_url, subscription_tier, last_login } =
      req.body;

    // Validate required fields
    if (!uid || !email || !name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ uid }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email or uid already exists",
      });
    }

    // Create new user
    const user = new User({
      uid,
      email,
      name,
      photo_url: photo_url || PHOTO_URL,
      subscription_tier: subscription_tier || "free",
      last_login: last_login || new Date(),
    });

    await user.save();

    // Return success response
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle validation errors separately
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating user",
      error: error.message,
    });
  }
};
