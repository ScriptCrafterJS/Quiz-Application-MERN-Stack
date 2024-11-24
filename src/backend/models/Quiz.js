import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    quiz_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
