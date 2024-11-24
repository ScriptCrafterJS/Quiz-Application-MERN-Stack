import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./frontend/pages/Registration";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
