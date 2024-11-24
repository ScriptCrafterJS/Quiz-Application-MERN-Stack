import Input from "../ui/Input";
import Label from "../ui/Label";
import { loginUser } from "../services/apiRegister";
import { useForm } from "react-hook-form";
import Welcome from "../ui/Welcome";
import backgroundImage from "../../assets/background.png";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  //whenever the form is submitted, react hook form will call this function
  function onSubmit(data) {
    loginUser(data);
    navigate("/quiz");
  }

  return (
    <div
      className="flex items-center justify-center h-screen bg-blue-500"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
      }}
    >
      <Welcome registered={true} />
      <form
        className="flex flex-col w-1/3 h-5/6 bg-white pt-5 px-10 relative shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
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

        <button
          type="submit"
          className="m-auto w-fit px-4 py-2 mb-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 absolute bottom-0 right-1/2 transform translate-x-1/2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
