import { Bell, Menu, Circle } from "lucide-react";

export default function Topbar({ onMenuClick }) {
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

        <p className="time-text">10:26:54 AM</p>
      </div>
    </header>
  );
}