import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Map,
  Camera,
  Bell,
  X,
  LogOut, // Added LogOut icon
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Added Auth context

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Criminal Database", icon: Users, path: "/criminals" },
  { label: "Map View", icon: Map, path: "/map" },
  { label: "Cameras", icon: Camera, path: "/cameras" },
  { label: "Alert History", icon: Bell, path: "/alerts" },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    if (onClose) onClose(); // Close mobile sidebar on logout
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-box">
            {/* Replaced Shield with profile.png */}
            <img 
              src="/profile.png" 
              alt="Logo" 
              style={{ width: "24px", height: "24px", objectFit: "cover", borderRadius: "4px" }} 
            />
          </div>

          <div>
            <h2>AI Thief</h2>
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

        {/* Added Sidebar Footer for Logout */}
        <div className="sidebar-footer">
          <button className="logout-button sidebar-logout" onClick={handleLogout}>
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}