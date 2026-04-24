import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Map,
  Camera,
  Bell,
  Shield,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Criminal Database", icon: Users, path: "/criminals" },
  { label: "Map View", icon: Map, path: "/map" },
  { label: "Cameras", icon: Camera, path: "/cameras" },
  { label: "Alert History", icon: Bell, path: "/alerts" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-box">
            <Shield size={20} />
          </div>

          <div>
            <h2>SENTINEL</h2>
            <p>DETECTION SYSTEM</p>
          </div>

          <button className="sidebar-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-title">NAVIGATION</span>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}