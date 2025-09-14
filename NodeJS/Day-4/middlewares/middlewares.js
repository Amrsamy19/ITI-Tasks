const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.url} ${
      res.statusCode
    } - ${new Date().toLocaleTimeString()}`
  );
  next();
};
module.exports = logger;
