import express, { Request, Response } from "express";
import cors from "cors";
import { ExercisePlannerResponse } from "./DataTypes";

const app = express();
const mongoose=require('mongoose')
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/prompt", (req: Request, res: Response) => {
  // To-do: Make call to ChatGpt when implemented.
  res.send({
    videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA',
    instructions: `Cat-Cow Stretch Instructions
        Starting Position:
        - Begin on your hands and knees (tabletop position) on a yoga mat.
        - Wrists under shoulders, knees under hips, back flat and neutral.
        - Neck in line with spine, gaze at the floor.
        Cow Pose (Inhale):
        - Inhale deeply through your nose.
        - Arch your back: drop your belly toward the mat.
        - Lift your tailbone and chest, gaze slightly upward.
        - Roll shoulders back and away from your ears.
        Cat Pose (Exhale):
        - Exhale slowly through nose or mouth.
        - Round your back: draw belly button toward spine.
        - Tuck your tailbone under.
        - Tuck your chin to chest, let head relax down.
        Repeat:
        - Flow slowly between Cat and Cow with your breath.
        - Repeat 10-15 times or for 1-2 minutes.
        Tips & Precautions:
        - Move slowly, no sudden movements.
        - Only move within a pain-free range.
        - Use padding for knees if needed.
        - Consult your doctor or PT if you have serious back issues.
        Be gentle and mindful. Happy stretching!`
  } as ExercisePlannerResponse).json();
});
