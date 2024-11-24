import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Question from "./models/Question.js";
import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// [USER MANAGEMENT API] ========================================
// Regstration
app.post("/register", async (req, res) => {
  const { name, email, password, role, teacher_id } = req.body;
  try {
    //check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (role === "teacher") {
      const teacher = new User({ name, email, password, role });
      await teacher.save();
      res.status(201).json({ message: "User created successfully" });
    } else if (role === "student") {
      const user = new User({ name, email, password, role, teacher_id });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Invalid role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Password is Incorrect, please try again" });
    }

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//fetch all teachers
app.get("/teachers", async (req, res) => {
  const token = req.header("authorization");

  //this first checks if theres a jwt or not
  if (!token) {
    //403 forbidden because of no precense of token
    return res.status(403).json({ message: "No Token Provided" });
  }

  //this verifies the token
  jwt.verify(token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      return res.status(401).json({ message: "Faild to authenticate" });
    }
    try {
      const teachers = await User.find({ role: "teacher" });
      res.status(200).json(teachers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
});

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
