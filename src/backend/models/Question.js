import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    text: { type: String, required: true },
    options: [{ type: String, required: true }], //set of possible answers
    correct_option: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
