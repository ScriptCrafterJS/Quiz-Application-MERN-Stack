import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API is running..."));

// Regstration
app.post("/register", async (req, res) => {
  const { name, email, password, role, teacher_id } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (role === "teacher") {
      const teacher = new User({ name, email, password, role });
      await teacher.save();
      res.status(201).json({ message: "Teacher created successfully" });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
