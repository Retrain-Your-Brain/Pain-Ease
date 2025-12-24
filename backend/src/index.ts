import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/UserRouter";
import OpenAI from "openai";
import { z } from "zod";
import dotenv from "dotenv";
import SampleBackPainOutput from "./BackPain_Output.json";
import SampleNeckPainOutput from "./NeckPain_Output.json";

dotenv.config();

const url = process.env.URL || "";
const app = express();
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.log(err));


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not set");
  process.exit(1);
}

// Zod schema
const ExerciseSchema = z.object({
  exerciseName: z.string(),
  youtubeLink: z.string().url(),
  instructions: z.string(),
  frequency: z.string(),
});

const ExercisePlanSchema = z.object({
  exercises: z.array(ExerciseSchema),
});

app.use("/", userRouter);
app.post("/generate-exercise-plan", async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: "You are an assistant that outputs JSON exactly in the specified format." },
        {
          role: "user",
          content: `Create a detailed exercise plan for: ${prompt}. 
Return ONLY a JSON object of the form:
{
  "exercises": [
    {
      "exerciseName": "string",
      "youtubeLink": "string",
      "instructions": "string",
      "frequency": "string"
    }
  ]
}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }, // ✅ Supported
    });

    const raw = completion.choices[0]?.message?.content;
    if (raw === null) {
      throw new Error("No content returned from OpenAI");
    }
    const parsedJson = JSON.parse(raw);
    const parsed = ExercisePlanSchema.safeParse(parsedJson);

    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.format());
      res.status(500).json({
        error: "Validation failed for ChatGPT output",
        details: parsed.error.format(),
        raw: parsedJson,
      });
      return;
    }

    res.json(parsed.data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
});

app.get("/example-back-pain-response", async (req: Request, res: Response): Promise<void> => {
  res.json(SampleBackPainOutput);
  return Promise.resolve();
});

app.get("/example-neck-pain-response", async (req: Request, res: Response): Promise<void> => {
  res.json(SampleNeckPainOutput);
  return Promise.resolve();
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
