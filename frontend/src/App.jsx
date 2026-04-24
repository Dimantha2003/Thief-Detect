import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CriminalDatabase from "./pages/CriminalDatabase";
import CameraManagement from "./pages/CameraManagement";
import AlertHistory from "./pages/AlertHistory";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="criminals" element={<CriminalDatabase />} />
        <Route path="cameras" element={<CameraManagement />} />
        <Route path="alerts" element={<AlertHistory />} />
      </Route>
    </Routes>
  );
}

export default App;