const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/chatdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
});

const conversationSchema = new mongoose.Schema({
  conversationId: { type: String, unique: true },
  history: [messageSchema],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    let conversation =
      (await Conversation.findOne({ conversationId })) ||
      new Conversation({ conversationId, history: [] });

    const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const data = await response.json();

    let botReply = "";
    if (Array.isArray(data.choices) && data.choices[0]?.message) {
      botReply = data.choices[0].message.content.trim();
    } else {
      botReply = "Hmm, I didn’t catch that. Try again?";
    }

    conversation.history.push({ role: "user", content: message });
    conversation.history.push({ role: "assistant", content: botReply });
    conversation.conversationId = data.id;

    if (conversation.history.length > 20)
      conversation.history = conversation.history.slice(-20);

    await conversation.save();

    res.json({
      message: botReply,
      conversationId,
      history: conversation.history,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to generate response",
      details: err.message,
    });
  }
});

app.get("/api/chat/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  const conversation =
    (await Conversation.findOne({ conversationId })) ||
    new Conversation({ conversationId, history: [] });
  res.json({ history: conversation.history });
});

app.delete("/api/chat/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  await Conversation.deleteOne({ conversationId });
  res.json({ message: "Conversation cleared" });
});

app.get("/api/health", (_, res) => {
  res.json({
    status: "ok",
    model: "meta-llama/Llama-3.1-8B-Instruct",
    provider: "Hugging Face Router",
  });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
