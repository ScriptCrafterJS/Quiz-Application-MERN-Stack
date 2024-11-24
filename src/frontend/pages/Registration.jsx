import { useState } from "react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getTeachers, registerUser } from "../services/apiRegister";
export default function Registration() {
  const [isStudent, setIsStudent] = useState(false);
  const [teacher, setTeacher] = useState("");

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
    //this means that the query will only be enabled if the role is student
    enabled: isStudent,
    onSuccess: (data) => {
      if (data.length > 0) {
        setTeacher(data[0]._id);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { register, handleSubmit, resetField } = useForm();

  //whenever the form is submitted, react hook form will call this function
  function onSubmit(data) {
    registerUser(data);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <form
        className="flex flex-col w-1/3 h-5/6 bg-white pt-5 px-10 rounded-xl relative shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="name">
          Name:
          <br />
          <Input
            id="name"
            type="name"
            placeholder="Jake Peralta"
            {...register("name")}
          />
        </Label>
        <Label htmlFor="email">
          Email:
          <br />
          <Input
            id="email"
            type="email"
            placeholder="jake@example.com"
            {...register("email")}
          />
        </Label>
        <Label htmlFor="password">
          Password:
          <br />
          <Input
            id="password"
            type="password"
            placeholder="123$pass"
            {...register("password")}
          />
        </Label>
        <Label htmlFor="role">Role:</Label>
        <select
          name="role"
          id="role"
          value={isStudent ? "student" : "teacher"}
          className="bg-gray-100 outline-none w-full px-3 py-2 rounded-full mb-4"
          {...register("role", {
            onChange: (e) => {
              setIsStudent(e.target.value === "student");
              //this will reset the teacher_id field to undefined
              resetField("teacher_id");
            },
          })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {isStudent && (
          <Label htmlFor="teacher">
            Teacher you study with:
            <br />
            <select
              name="teacher_id"
              id="teacher"
              className="bg-gray-100 outline-none w-full px-3 py-2 rounded-full"
              value={teacher}
              {...register("teacher_id", {
                onChange: (e) => setTeacher(e.target.value),
              })}
            >
              <option value=""></option>
              {teachers.map((teacher) => (
                <option key={teacher.user_id} value={teacher.user_id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </Label>
        )}
        <button
          type="submit"
          className="m-auto w-fit px-4 py-2 mb-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 absolute bottom-0 right-1/2 transform translate-x-1/2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
