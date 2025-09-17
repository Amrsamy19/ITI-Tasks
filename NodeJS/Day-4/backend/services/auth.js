const {
  register,
  authenticate,
  verifyToken,
} = require("../controllers/authController");

const createNewUser = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await register({ name, username, password });

    if (!newUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await authenticate({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ token: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createNewUser,
  login,
};
