import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import CriminalDatabase from "../pages/CriminalDatabase";
import CameraManagement from "../pages/CameraManagement";
import AlertHistory from "../pages/AlertHistory";
import Login from "../pages/Login";
import MapView from "../pages/MapView";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Main App Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="criminals" element={<CriminalDatabase />} />
        <Route path="cameras" element={<CameraManagement />} />
        <Route path="alerts" element={<AlertHistory />} />
        <Route path="map" element={<MapView />} />
        {/* Redirect wrong routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;