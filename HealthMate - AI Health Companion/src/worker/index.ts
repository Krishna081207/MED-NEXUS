import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";

interface Env {
  GEMINI_API_KEY?: string;
}

const app = new Hono<{ Bindings: Env }>();

// Health chat endpoint
app.post("/api/chat", async (c) => {
  const { messages } = await c.req.json<{
    messages: Array<{ role: "user" | "assistant"; content: string }>;
  }>();

  if (!messages || messages.length === 0) {
    return c.json({ error: "No messages provided" }, 400);
  }

  const apiKey = c.env.GEMINI_API_KEY;
  if (!apiKey) {
    return c.json({ error: "API key not configured" }, 500);
  }

  const ai = new GoogleGenAI({ apiKey });

  // Convert messages to Gemini format
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "user" ? "user" : ("model" as const),
    parts: [{ text: msg.content }],
  }));

  const lastMessage = messages[messages.length - 1];

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `You are HealthMate, a compassionate and supportive AI health companion. Your role is to:

1. Listen empathetically when users share their feelings, stress, or health concerns
2. Provide general wellness guidance and healthy lifestyle tips
3. Help users understand common health topics in simple terms
4. Offer emotional support and coping strategies for stress and anxiety
5. Encourage healthy habits like exercise, sleep, and nutrition

IMPORTANT GUIDELINES:
- Be warm, caring, and non-judgmental in your responses
- Never diagnose medical conditions or prescribe treatments
- Always recommend consulting healthcare professionals for medical advice
- If someone describes emergency symptoms, urge them to seek immediate medical care
- Keep responses concise but helpful (2-3 paragraphs max)
- Ask follow-up questions to better understand their situation`,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
    history,
  });

  try {
    const response = await chat.sendMessage({
      message: lastMessage.content,
    });

    return c.json({ message: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return c.json({ error: "Failed to generate response" }, 500);
  }
});

export default app;
