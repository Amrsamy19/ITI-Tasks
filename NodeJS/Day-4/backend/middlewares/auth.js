const { verifyToken } = require("../controllers/authController");

const authMiddleware = async (req, resp, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return resp.status(401).send({
      error: "Missing access token.",
    });
  }

  const token = authHeader.substring(7);

  try {
    const results = await verifyToken(token);
    if (results.role !== "admin") {
      return resp.status(403).send({
        error: "Forbidden Access.",
      });
    }
    req.currentUser = {
      username: results.username,
      id: results.id,
      role: results.role,
    };
    return next();
  } catch (err) {
    resp.status(401).send({
      error: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
