// Base logger
const log = (msg) => console.log(msg);

// Decorators
const withTimestamp = (logger) => (msg) =>
  logger(`[${new Date().toISOString()}] ${msg}`);

const toUppercase = (logger) => (msg) => logger(msg.toUpperCase());

const asJSON = (logger) => (msg) =>
  logger(JSON.stringify({ message: msg, time: new Date().toISOString() }));

withTimestamp(log)("System started");
toUppercase(log)("server running");
asJSON(log)("connection established");
