const nodemailer = require("nodemailer");
const API_KEY = "AIzaSyA2YKcVFJwG4F37r6h8FbEeFT3xl2-jD1w";

const AiTaskExtractor = async (text) => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Extract reminder & time in minutes from: "${text}" Return only JSON like: {"task":"drink water", "minutes":1} No code blocks, no comments, no text.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!reply) throw new Error("Model did not return text");

  const cleaned = reply.replace(/json/gi, "").replace(/or/gi, "or").trim();

  return JSON.parse(cleaned);
};

const sendEmailReminder = async (task) => {
  const mailOptions = {
    from: "amrsamy622@gmail.com",
    to: "amrsamy622@gmail.com",
    subject: "Reminder",
    text: `Reminder: ${task}`,
  };

  nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: "amrsamy622@gmail.com",
        pass: "efnb lezh wprl kbup",
      },
    })
    .sendMail(mailOptions);
};

(async (message) => {
  try {
    const { task, minutes } = await AiTaskExtractor(message);

    console.log(`Reminder sceduled: "${task}" in ${minutes} minutes`);

    setTimeout(() => {
      console.log(`Reminder: ${task}`);
      sendEmailReminder(task);
    }, minutes * 60 * 1000);
  } catch (error) {
    console.error(error.message);
  }
})("Remind me to drink water in 1 minute");
