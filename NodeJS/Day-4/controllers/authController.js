const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../utils/utils");
const { getByUserName, createUser } = require("../services/user");

const register = async (userData) => {
  // check if user exists
  const user = await getByUserName(userData.username);

  if (user) {
    return null;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await createUser({
    name: userData.name,
    password: hashedPassword,
    username: userData.username,
    role: userData.role,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    username: newUser.username,
  };
};

const authenticate = async (signInRequest) => {
  const user = await getByUserName(signInRequest.username);

  if (!user) {
    throw Error("Invalid username");
  }

  const isValid = await bcrypt.compare(signInRequest.password, user.password);

  if (!isValid) {
    throw Error("Invalid password");
  }

  const tokenPayload = {
    id: user.id,
    name: user.name,
    username: user.username,
  };

  return generateToken(tokenPayload, user.id);
};

const generateToken = (payload, userId) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
    issuer: "bookstore-api",
    subject: `${userId}`,
  });
};

const verifyToken = async (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  register,
  authenticate,
  verifyToken,
};
