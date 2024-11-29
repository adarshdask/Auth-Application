import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../dashboard/components/Dashboard";

function PrivateRoutes({ isAuthenticated }: { isAuthenticated: boolean }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default PrivateRoutes;
