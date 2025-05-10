import Test from "../models/test.model.js";

export const createTest = async (req, res) => {
  try {
    const { email, name, age } = req.body;

    // Validate required fields
    if (!email || !name || !age) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if user already exists
    const existingTest = await Test.findOne({ email });

    if (existingTest) {
      return res.status(409).json({
        success: false,
        message: "Test with this email already exists",
      });
    }

    // Create new user
    const test = new Test({
      email,
      name,
      age,
    });

    await test.save();

    // Return success response
    res.status(201).json({
      success: true,
      data: test,
    });
  } catch (error) {
    console.error("Error creating test:", error);

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
      message: "Server error while creating test",
      error: error.message,
    });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    console.error("Error getting tests:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while getting tests" });
  }
};

export const getTestByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email parameter is required",
      });
    }

    const test = await Test.findOne({ email });
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }
    res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.error("Error getting test by email:", error);
    res.status(500).json({
      success: false,
      message: "Server error while getting test by email",
    });
  }
};
