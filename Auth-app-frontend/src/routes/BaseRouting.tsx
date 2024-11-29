import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../auth/components/login/Login";
import Signup from "../auth/components/signup/Signup";
import PrivateRoutes from "./PrivateRoutes";

function BaseRouting() {
  const isAuthenticated = !!localStorage.getItem("accessToken") && !!localStorage.getItem("refreshToken");
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/*"
          element={<PrivateRoutes isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default BaseRouting;
