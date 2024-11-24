import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import PropTypes from "prop-types";

Welcome.propTypes = {
  registered: PropTypes.bool,
};
export default function Welcome({ registered }) {
  return (
    <div className="relative flex flex-col justify-center items-center w-1/3 h-5/6 bg-blue-600 shadow-lg">
      <img
        src={heroImage}
        alt="hero"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80"
      />
      <h1 className="mb-64 text-3xl text-white font-bold">
        Welcome to Quizlly 💡
      </h1>
      <Link
        to={`${registered ? "/registration" : "/"}`}
        className="bg-white text-blue-600 py-2 px-4 rounded-md absolute bottom-32 left-1/2 transform -translate-x-1/2 hover:bg-blue-100 "
      >
        {registered ? "Register" : "Login"}
      </Link>
    </div>
  );
}
