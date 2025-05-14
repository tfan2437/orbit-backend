import admin from "../config/firebaseAdmin.js";

// Middleware to verify Firebase ID token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Extract the token from the header (remove 'Bearer ' prefix)
    const idToken = authHeader.split("Bearer ")[1];

    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Add decoded token to request object for use in protected routes
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid firebase token" });
  }
};
