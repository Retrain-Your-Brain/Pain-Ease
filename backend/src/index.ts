import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/prompt", (req: Request, res: Response) => {
  res.send("Not Implement Yet.");
});
