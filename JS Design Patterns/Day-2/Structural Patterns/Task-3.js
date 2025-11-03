// Base logger
const log = (msg) => console.log(msg);

// Decorators
const withTimestamp = (logger) => (msg) =>
  logger(`[${new Date().toISOString()}] ${msg}`);

const toUppercase = (logger) => (msg) => logger(msg.toUpperCase());

// Chain them — first uppercase, then timestamp
const decorated = withTimestamp(toUppercase(log));

decorated("system started");

// Flyweight Factory
const createStyleFactory = () => {
  const styles = new Map();

  return (font, size) => {
    const key = `${font}-${size}`;
    if (!styles.has(key)) {
      styles.set(key, { font, size });
    }
    return styles.get(key);
  };
};

const styleFactory = createStyleFactory();

const text1 = { content: "Hello", style: styleFactory("Arial", 12) };
const text2 = { content: "World", style: styleFactory("Arial", 12) };
const text3 = { content: "Bye", style: styleFactory("Times New Roman", 14) };

console.log(text1.style === text2.style);
console.log(text1.style === text3.style);
