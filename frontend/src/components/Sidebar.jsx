import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Camera, Bell } from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Thief Detect</h2>

      <nav className="nav-menu">
        <NavLink to="/" end>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="/criminals">
          <Users size={18} /> Criminal Database
        </NavLink>

        <NavLink to="/cameras">
          <Camera size={18} /> Cameras
        </NavLink>

        <NavLink to="/alerts">
          <Bell size={18} /> Alert History
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;