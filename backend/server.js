import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/recommend", async (req, res) => {
  try {
    const { category, description, similar } = req.body;

    // Build a prompt that uses both boxes clearly
    const prompt = `
    You are a recommendation engine. Recommend 5 ${category}.
    User described what they want as: "${description}".
    They already like or find similar: "${similar}".
    Return concise recommendations (name + 1-line reason for each).
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    const text = result.response.text();
    const lines = text.split("\n").filter((line) => line.trim());
    res.json({ recommendations: lines });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    res.status(500).json({ error: "Error generating recommendations" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
