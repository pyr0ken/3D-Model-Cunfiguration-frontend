import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardMainPage from "./components/Dashboard/DashboardMainPage";
import ModelsList from "./components/Dashboard/Models/ModelsList";
import Room from "./components/Room/Room";
import RoomsList from "./components/Dashboard/Rooms/RoomsList";
import Editor from "./components/Editor/Editor";
import Home from "./components/Home/Home";
import { useAuthStore } from "./store/authStore";
import "react-toastify/dist/ReactToastify.css";
import PointCloud from "./components/Editor/PointCloud";
import NiiVue from "./components/Editor/NiiVue/NiiVue";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect the user to the login page if they are not authenticated
    return (
      <Navigate
        to={"/login"}
        state={{ successMessage: "لطفا اول وارد شوید." }}
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

        {/* Testing Route */}
        <Route path="/cloud" element={<PointCloud />} />
        {/* <Route path="/niivue" element={<NiiVue />} /> */}

        {/* Authentication Links */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Links */}
        <Route
          path="/dashboard/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <DashboardMainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="models/"
            element={
              <ProtectedRoute>
                <ModelsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="rooms/"
            element={
              <ProtectedRoute>
                <RoomsList />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Room Links */}
        <Route
          path="/rooms/:id"
          element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          }
        />

        {/* Editor Links */}
        <Route
          path="/editor/"
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
              <div className="bg-dot flex h-screen flex-col items-center justify-center gap-y-4 text-white">
                <h1 className="text-3xl">| صفحه مورد نظر پیدا نشد 404 |</h1>
                <a
                  className="text-xl text-leva-3 hover:text-leva-3/70"
                  href="/"
                >
                  {" "}
                  صفحه اصلی{" "}
                </a>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
