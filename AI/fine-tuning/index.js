const API_KEY = "AIzaSyA2YKcVFJwG4F37r6h8FbEeFT3xl2-jD1w";

async function askBot(question) {
  const prompt = `
You are a helpful assistant for Shop.com.
Use the following information and examples to answer clearly and politely.

Store Info:
- Business Hours: 9 AM to 5 PM, Monday to Friday
- Shipping: 3–5 business days
- Contact: support@shop.com
- Returns: 30-day money-back guarantee

Examples:
Q: What time do you open?
A: We’re open from 9 AM to 5 PM, Monday through Friday.

Now answer this new question:
Q: ${question}
A:
`;

  console.log("Question:", question);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const result = await response.json();
  console.log(
    "Answer:",
    result?.candidates?.[0]?.content?.parts?.[0]?.text || result
  );
}

async function runExamples() {
  await askBot("When will my order arrive?");
  await askBot("How can I contact support?");
  await askBot("What are your business hours?");
  await askBot("Do you accept PayPal?");
}

runExamples();
