import { useState } from "react";
import Input from "../ui/Input";
import Label from "../ui/Label";
export default function Registration() {
  const [isStudent, setIsStudent] = useState(false);
  const [teachers] = useState([]);
  return (
    <div className="flex flex-col items-center pt-40 h-screen">
      <form className="flex flex-col w-fit">
        <Label>
          Email:
          <br />
          <Input type="email" placeholder="Enter your email..." />
        </Label>
        <Label>
          Password:
          <br />
          <Input type="password" placeholder="Enter your password..." />
        </Label>
        <Label htmlFor="roles">Role:</Label>
        <select
          name="roles"
          id="roles"
          onChange={(e) => setIsStudent(e.target.value === "student")}
          value={isStudent ? "student" : "teacher"}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {isStudent && (
          <Label>
            Teacher you study with:
            <select name="teachers" id="teachers">
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </Label>
        )}
        <button
          type="submit"
          className="w-fit px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
