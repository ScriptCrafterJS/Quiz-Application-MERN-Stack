import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Question from "./models/Question.js";
import authenticateToken from "./middleware/auth.js";
import {
  loginRoute,
  registerRoute,
  teachersRoute,
} from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// [USER MANAGEMENT API] ========================================

app.post("/register", registerRoute);

app.post("/login", loginRoute);

app.get("/teachers", teachersRoute);

// [QUIZ MANAGEMENT API] ========================================

//fetch all questions
app.get("/questions", authenticateToken, async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//add question
app.post("/questions", authenticateToken, async (req, res) => {
  const { text, options, correct_option } = req.body;
  try {
    const question = new Question({ text, options, correct_option });
    await question.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//delete question
app.delete("/questions/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//submitting answers and getting score

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
