const jwt = require("jsonwebtoken");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY; 


// Middleware function to check if the user is authenticated
exports.authenticateUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, secretKey);

    // Attach the user object to the request
    req.user = decodedToken.user;

    next(); // Call the next middleware
  } catch (error) {
    console.log("Error verifying token:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT for a user
exports.generateToken = (user) => {
  const tokenPayload = {
    user: {
      mobile: user.mobile,
    },
  };

  // Generate the token
  const token = jwt.sign(tokenPayload, secretKey);

  return token;
};
