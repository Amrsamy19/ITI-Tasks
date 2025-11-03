// --- Discount Strategies ---
const percentageStrategy = {
  apply: (price) => price * 0.9,
};

const fixedStrategy = {
  apply: (price) => price - 20,
};

const bogoStrategy = {
  apply: (price) => price / 2,
};

// --- Strategy Context ---
function calcDiscount(strategy, price) {
  return strategy.apply(price);
}

console.log(calcDiscount(percentageStrategy, 200));
console.log(calcDiscount(fixedStrategy, 200));
console.log(calcDiscount(bogoStrategy, 200));
