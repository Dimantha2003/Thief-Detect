import {
  Users,
  Camera,
  TriangleAlert,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import "../styles/dashboard.css";

const stats = [
  { title: "TOTAL CRIMINALS", value: "847", icon: Users },
  { title: "ACTIVE CAMERAS", value: "156", icon: Camera },
  { title: "ALERTS TODAY", value: "23", icon: TriangleAlert },
  { title: "PENDING ALERTS", value: "8", icon: Clock },
  { title: "IDENTIFICATIONS", value: "1243", icon: CheckCircle },
  { title: "AVG RESPONSE", value: "4.2 min", icon: Shield },
];

const alerts = [
  {
    name: "Ahmed Khan",
    location: "Main Boulevard - Sector 7",
    accuracy: "94.2%",
    status: "new",
    color: "red",
  },
  {
    name: "Rashid Ali",
    location: "Industrial Zone Gate",
    accuracy: "87.8%",
    status: "dispatched",
    color: "blue",
  },
  {
    name: "Usman Tariq",
    location: "Highway Toll Plaza",
    accuracy: "91.5%",
    status: "acknowledged",
    color: "yellow",
  },
  {
    name: "Bilal Hussain",
    location: "Commercial Area Block C",
    accuracy: "78.3%",
    status: "resolved",
    color: "green",
  },
];

const wanted = [
  {
    name: "Ahmed Khan",
    crime: "Armed Robbery, Assault",
    level: "high",
    img: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Rashid Ali",
    crime: "Murder, Drug Trafficking",
    level: "critical",
    img: "https://i.pravatar.cc/80?img=33",
  },
  {
    name: "Usman Tariq",
    crime: "Kidnapping, Extortion",
    level: "critical",
    img: "https://i.pravatar.cc/80?img=15",
  },
];

export default function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <h1>Command Center</h1>
        <p>Real-time surveillance and threat monitoring</p>
      </div>

      <div className="stats-grid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="stat-card" key={index}>
              <div className="stat-title">
                <Icon size={15} />
                <span>{item.title}</span>
              </div>
              <h2>{item.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-title danger">
            <TriangleAlert size={16} />
            <h3>Recent Alerts</h3>
          </div>

          <div className="alert-list">
            {alerts.map((alert, index) => (
              <div className="alert-row" key={index}>
                <div className={`alert-dot ${alert.color}`} />

                <div className="alert-info">
                  <h4>{alert.name}</h4>
                  <p>{alert.location}</p>
                </div>

                <span className="accuracy">{alert.accuracy}</span>
                <span className={`status-pill ${alert.status}`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-title primary">
            <Shield size={16} />
            <h3>Most Wanted</h3>
          </div>

          <div className="wanted-list">
            {wanted.map((person, index) => (
              <div className="wanted-row" key={index}>
                <img src={person.img} alt={person.name} />

                <div className="wanted-info">
                  <h4>{person.name}</h4>
                  <p>{person.crime}</p>
                </div>

                <span className={`wanted-level ${person.level}`}>
                  {person.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}