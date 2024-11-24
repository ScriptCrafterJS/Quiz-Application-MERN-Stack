import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function loginRoute(req, res) {
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
}

export async function registerRoute(req, res) {
  const { name, email, password, role, teacher_id } = req.body;
  try {
    //check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Your email already registered" });
    }

    if (role === "teacher") {
      const teacher = new User({ name, email, password, role });
      await teacher.save();
      res.status(201).json({ message: "User registered successfully!" });
    } else if (role === "student") {
      const user = new User({ name, email, password, role, teacher_id });
      await user.save();
      res.status(201).json({ message: "User registered successfully!" });
    } else {
      res.status(400).json({ message: "Invalid role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function teachersRoute(req, res) {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
