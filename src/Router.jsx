import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Private from "./components/shared/Private";

const RouterComponet = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default RouterComponet;
