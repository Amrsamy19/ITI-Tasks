const requireAuthMiddleware = async (req, resp, next) => {
  console.log("Validating user authenticaiton...");

  // 1. read token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return resp.status(401).send({
      error: "Missing access token.",
    });
  }
  // Bearer asdsadv123-12312124
  const token = authHeader.substring(7);

  // 2. verify token
  try {
    const results = await authService.verifyToken(token);
    req.currentUser = {
      name: results.name,
      email: results.email,
      id: results.id,
    };
    return next();
  } catch (err) {
    // token is not valid
    resp.status(401).send({
      error: "Invalid or expired token.",
    });
  }
};

module.exports = requireAuthMiddleware;
