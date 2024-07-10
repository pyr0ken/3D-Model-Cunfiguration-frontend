import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardMainPage from "./components/Dashboard/DashboardMainPage";
import ModelsList from "./components/Dashboard/Models/ModelsList";
import Room from "./components/Dashboard/Rooms/Room";
import RoomsList from "./components/Dashboard/Rooms/RoomsList";
import Editor from "./components/Editor/Editor";
import Home from "./components/Home/Home";
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
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication Links */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Room Links */}
        <Route
          path="/rooms/:id"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Links */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardMainPage />} />{" "}
          <Route path="models/" element={<ModelsList />} />
          <Route path="rooms/" element={<RoomsList />} />
        </Route>

        <Route
          path="/dashboard/editor/:editModelId"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />

        {/* Not Found Page */}
        <Route
          path="*"
          element={
            <>
              <div className="flex h-screen items-center justify-center text-white">
                <h1>|: NotFound 404 :|</h1>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
