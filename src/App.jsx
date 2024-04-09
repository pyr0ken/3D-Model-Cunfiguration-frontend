import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home/Home";
import Login from "./components/Authentication/Login";
import Regiter from "./components/Authentication/Register";
import Base from "./components/Sidebar/Base";
import Dashboard from "./components/Dashboard/Dashboard";
import Models from "./components/Dashboard/Models";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect the user to the login page if they are not authenticated
    return (
      <Navigate
        to={"/login"}
        state={{ successMessage: "Please Log in and try again" }}
      />
    );
  }

  // Render the child routes if the user is authenticated
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiter />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="models/" element={<Models />} />
        </Route>
        <Route path="/dashboard/models/:id" element={<Base />} />
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
