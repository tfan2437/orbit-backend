import { PHOTO_URL } from "../config/env.js";
import User from "../models/user.model.js";

/**
 * Create a new user
 */
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

    // Create new user with defaults
    const userData = {
      uid,
      email,
      name,
      photo_url: photo_url || PHOTO_URL,
      subscription_tier: subscription_tier || "free",
      last_login: last_login || new Date(),
    };

    const user = new User(userData);
    await user.save();

    // Return success response
    res.status(201).json({
      success: true,
      user: userData,
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

/**
 * Get user by UID
 */
export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "UID parameter is required",
      });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      photo_url: user.photo_url,
      subscription_tier: user.subscription_tier,
      last_login: user.last_login,
    };

    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while getting user",
      error: error.message,
    });
  }
};

/**
 * Update user
 */
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updateData = req.body;

    // Remove any attempt to change immutable fields
    delete updateData.uid;
    delete updateData.email;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "UID parameter is required",
      });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user with new data
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        user[key] = updateData[key];
      }
    });

    await user.save();

    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      photo_url: user.photo_url,
      subscription_tier: user.subscription_tier,
      last_login: user.last_login,
    };

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating user",
      error: error.message,
    });
  }
};

// firebase auth with user data
// check if user exists in database
// if not, create user
// if yes, return user
