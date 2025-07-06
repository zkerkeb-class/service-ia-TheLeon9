import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST : http://localhost:4002/chat
// {
// "message": "Type a message...",
// }
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "❌  Message is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ou 'gpt-3.5-turbo'
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error from OpenAI:", error.message);
    res
      .status(500)
      .json({ error: "❌ An error occurred while talking to the AI." });
  }
});

export { router as chatRouter };
