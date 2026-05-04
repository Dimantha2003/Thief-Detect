import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

import Dashboard from "../pages/Dashboard";
import CriminalDatabase from "../pages/CriminalDatabase";
import CameraManagement from "../pages/CameraManagement";
import AlertHistory from "../pages/AlertHistory";
import Login from "../pages/Login";
import MapView from "../pages/MapView";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - only for logged out users */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected routes - only for logged in users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="criminals" element={<CriminalDatabase />} />
          <Route path="cameras" element={<CameraManagement />} />
          <Route path="alerts" element={<AlertHistory />} />
          <Route path="map" element={<MapView />} />
        </Route>
      </Route>

      {/* Wrong routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;