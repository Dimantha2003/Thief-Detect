import {
  TriangleAlert,
  Radio,
  Clock,
  CheckCircle,
} from "lucide-react";
import "../styles/alertHistory.css";

const alerts = [
  {
    name: "Ahmed Khan",
    id: "ALT-001",
    location: "Main Boulevard - Sector 7",
    camera: "CAM-003",
    date: "3/3/2026",
    time: "2:23:00 PM",
    confidence: "94.2%",
    status: "new",
    type: "danger",
  },
  {
    name: "Rashid Ali",
    id: "ALT-002",
    location: "Industrial Zone Gate",
    camera: "CAM-007",
    date: "3/3/2026",
    time: "1:45:00 PM",
    confidence: "87.8%",
    status: "dispatched",
    type: "signal",
  },
  {
    name: "Usman Tariq",
    id: "ALT-003",
    location: "Highway Toll Plaza",
    camera: "CAM-012",
    date: "3/3/2026",
    time: "12:10:00 PM",
    confidence: "91.5%",
    status: "acknowledged",
    type: "warning",
  },
  {
    name: "Bilal Hussain",
    id: "ALT-004",
    location: "Commercial Area Block C",
    camera: "CAM-005",
    date: "3/2/2026",
    time: "10:30:00 PM",
    confidence: "78.3%",
    status: "resolved",
    type: "success",
  },
];

function AlertIcon({ type }) {
  if (type === "signal") return <Radio size={20} />;
  if (type === "warning") return <Clock size={20} />;
  if (type === "success") return <CheckCircle size={20} />;
  return <TriangleAlert size={20} />;
}

export default function AlertHistory() {
  return (
    <section className="alert-history-page">
      <div className="alert-history-header">
        <h1>Alert History</h1>
        <p>Detection alerts and notification log</p>
      </div>

      <div className="alert-history-list">
        {alerts.map((alert) => (
          <article className="history-card" key={alert.id}>
            <div className={`history-icon ${alert.type}`}>
              <AlertIcon type={alert.type} />
            </div>

            <div className="history-content">
              <div className="history-title">
                <h3>{alert.name}</h3>
                <span>{alert.id}</span>
              </div>

              <p>
                Detected at <strong>{alert.location}</strong> via camera{" "}
                <strong>{alert.camera}</strong>
              </p>
            </div>

            <div className="history-meta">
              <span className={`history-status ${alert.status}`}>
                {alert.status}
              </span>

              <small>
                {alert.date}, {alert.time}
              </small>

              <strong>{alert.confidence} confidence</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}