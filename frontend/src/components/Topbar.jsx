import { Bell, Menu, Circle } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Import your auth context

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth(); // Grab the logged-in user

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>

        <div className="system-status">
          <span>SYSTEM ACTIVE</span>
          <Circle size={9} fill="#22c55e" color="#22c55e" />
        </div>
      </div>

      <div className="topbar-right">
        <button className="notification-btn">
          <Bell size={18} />
          <span>8</span>
        </button>

        {/* Added User Name Here */}
        <div className="topbar-user">
          <span>{user?.fullName || "User"}</span>
        </div>
      </div>
    </header>
  );
}