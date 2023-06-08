const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const { registerUser, loginUser, addTask } = require("./controller/userController");
const { authenticateUser } = require("./middleware/authMiddleware");

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Register user route
app.post("/register", registerUser);

// Login user route
app.post("/login", loginUser);

// Add task
app.post("/add-task", authenticateUser, addTask);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
