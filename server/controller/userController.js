const fs = require("fs");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../middleware/authMiddleware");


// Register a new user
exports.registerUser = (req, res) => {
  const { name, mobile, password } = req.body;

  if (!name || !mobile || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let users = [];

  try {
    const data = fs.readFileSync("./users.json");
    users = JSON.parse(data);
  } catch (error) {
    console.log("Error reading users file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  const existingUser = users.find((user) => user.mobile === mobile);

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const newUser = {
    id: uuidv4(), // Generate a unique ID using UUID
    name,
    mobile,
    password,
  };

  users.push(newUser);

  try {
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error writing users file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User login
exports.loginUser = (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let users = [];

  try {
    const data = fs.readFileSync("users.json");
    users = JSON.parse(data);
  } catch (error) {
    console.log("Error reading users file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  const user = users.find(
    (user) => user.mobile === mobile && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = generateToken(user);

  res.json({ message: "Login successful", user, token });
};

//Add task
exports.addTask = (req, res) => {
    const { taskName } = req.body;
    const mobile = req.user.mobile;
  
    if (!taskName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    let users = [];
  
    try {
      const data = fs.readFileSync("users.json");
      users = JSON.parse(data);
    } catch (error) {
      console.log("Error reading users file:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  
    const existingUser = users.find((user) => user.mobile === mobile);
  
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
  
    // Initialize tasks as an empty array if it doesn't exist
    if (!existingUser.tasks) {
      existingUser.tasks = [];
    }
  
    const taskId = uuidv4(); // Generate a unique task ID using uuidv4()
    existingUser.tasks.push({ taskId, taskName });
  
    try {
      fs.writeFileSync("users.json", JSON.stringify(users));
      res.json({ message: "Task added successfully", user: existingUser });
    } catch (error) {
      console.log("Error writing users file:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Get all tasks for a specific user
exports.getTasks = (req, res) => {
  const mobile = req.user.mobile;

  let users = [];

  try {
    const data = fs.readFileSync("users.json");
    users = JSON.parse(data);
  } catch (error) {
    console.log("Error reading users file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  const user = users.find((user) => user.mobile === mobile);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const tasks = user.tasks || [];

  res.json({ tasks });
};
