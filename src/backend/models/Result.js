import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    result_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: { type: Number, required: true },
    attempts: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
