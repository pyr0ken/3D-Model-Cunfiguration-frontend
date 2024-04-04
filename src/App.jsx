import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home/Home";
import MouseTracker from "./components/Models/MouseTracker";
import Login from "./components/Authentication/Login";
import Regiter from "./components/Authentication/Register";
import Base from "./components/Sidebar/Base";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mouse" element={<MouseTracker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiter />} />
        <Route path="/model" element={<Base />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  color: "white",
                }}
              >
                <h1>|: NotFound 404 :|</h1>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
