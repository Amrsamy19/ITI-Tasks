const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../configs/envConfigs");


const register = async (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    throw Error("Name & Email & Password are required!");
  }
  // check if user exists
  const user = await usersRepo.getByEmail(userData.email);

  if (user) {
    throw Error("User Exists!");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await usersRepo.createUser({
    name: userData.name,
    password: hashedPassword,
    email: userData.email,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

const signIn = async (signInRequest) => {
  // 1. validate input request (email & password)
  if (!signInRequest.email || !signInRequest.password) {
    throw Error("Email & Password are required");
  }

  // 2. get user by email (exists)
  const user = await usersRepo.getByEmail(signInRequest.email);

  if (!user) {
    throw Error("Invalid email or password");
  }

  // 3. compare password
  const isValid = await bcrypt.compare(signInRequest.password, user.password);

  if (!isValid) {
    throw Error("Invalid email or password");
  }

  // 4. generate token
  const tokenPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
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
  signIn,
  verifyToken,
};
