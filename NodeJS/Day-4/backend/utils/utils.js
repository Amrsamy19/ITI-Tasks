require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const PORT = process.env.PORT;
const apiPrefix = process.env.API_URL;
const mongoUrl = process.env.MONGODB_URL;

const createApiPrefix = (prefix) => {
  return apiPrefix + prefix;
};

module.exports = {
  jwtSecret,
  jwtExpiresIn,
  apiPrefix,
  mongoUrl,
  PORT,
  createApiPrefix,
};
