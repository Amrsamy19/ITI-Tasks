// Old API (string-based)
const legacyPay = (amount, currency) => `Paid ${amount} ${currency}`;

// New API (object-based)
const processPayment = ({ amount, currency, userId }) =>
  `Processed ${amount} ${currency} for user ${userId}`;

// Adapter function
const adaptLegacy = (legacyFn) => {
  return ({ amount, currency }) => {
    return legacyFn(amount, currency);
  };
};

const adapted = adaptLegacy(legacyPay);

console.log(processPayment({ amount: 100, currency: "USD", userId: 42 }));
console.log(adapted({ amount: 50, currency: "EUR", userId: 42 }));
