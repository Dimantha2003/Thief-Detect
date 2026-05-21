import {
  Users,
  Camera,
  TriangleAlert,
  Clock,
  CheckCircle,
  Shield,
  Bell,
} from "lucide-react";

import { useEffect, useState } from "react";

import { alertApi } from "../services/alertService";
import { criminalApi } from "../services/criminalService";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  const [criminals, setCriminals] = useState([]);

  const [latestAlert, setLatestAlert] =
    useState(null);

  // ==========================================
  // LOAD ALERTS
  // ==========================================
  const loadAlerts = async () => {
    try {
      const response = await alertApi.getAll();

      if (response.success) {
        const alertData = response.data;

        setAlerts(alertData);

        // LIVE POPUP DETECTION
        if (alertData.length > 0) {
          const newest = alertData[0];

          // ONLY SHOW NEW POPUP IF NEW ALERT
          if (
            latestAlert?.id !== newest.id
          ) {
            setLatestAlert(newest);

            // AUTO HIDE AFTER 6 SEC
            setTimeout(() => {
              setLatestAlert(null);
            }, 6000);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // LOAD CRIMINALS
  // ==========================================
  const loadCriminals = async () => {
    try {
      const response =
        await criminalApi.getAll();

      if (response.success) {
        setCriminals(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================
  useEffect(() => {
    loadAlerts();
    loadCriminals();

    // POLL EVERY 5 SECONDS
    const interval = setInterval(() => {
      loadAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // STATS
  // ==========================================
  const stats = [
    {
      title: "TOTAL CRIMINALS",
      value: criminals.length,
      icon: Users,
    },

    {
      title: "ACTIVE CAMERAS",
      value: "1",
      icon: Camera,
    },

    {
      title: "ALERTS TODAY",
      value: alerts.length,
      icon: TriangleAlert,
    },

    {
      title: "PENDING ALERTS",
      value: alerts.filter(
        (a) => a.status === "NEW"
      ).length,
      icon: Clock,
    },

    {
      title: "IDENTIFICATIONS",
      value: alerts.length,
      icon: CheckCircle,
    },

    {
      title: "SYSTEM STATUS",
      value: "ACTIVE",
      icon: Shield,
    },
  ];

  return (
    <section className="dashboard-page">
      {/* ==========================================
          LIVE ALERT POPUP
      ========================================== */}

      {latestAlert && (
        <div className="live-alert-popup">
          <Bell size={18} />

          <img
            src={
              latestAlert.criminal?.photos?.[0]
                ?.imageUrl
                ? `http://localhost:5000${latestAlert.criminal.photos[0].imageUrl}`
                : "https://i.pravatar.cc/100"
            }
            alt="criminal"
          />

          <div>
            <h4>
              🚨 Criminal Detected
            </h4>

            <p>
              {
                latestAlert.criminal
                  ?.fullName
              }
            </p>

            <span>
              Confidence:{" "}
              {
                latestAlert.confidenceScore
              }
              %
            </span>
          </div>
        </div>
      )}

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="page-heading">
        <h1>Command Center</h1>

        <p>
          Real-time surveillance and
          threat monitoring
        </p>
      </div>

      {/* ==========================================
          STATS
      ========================================== */}

      <div className="stats-grid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className="stat-card"
              key={index}
            >
              <div className="stat-title">
                <Icon size={15} />

                <span>
                  {item.title}
                </span>
              </div>

              <h2>{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* ==========================================
          GRID
      ========================================== */}

      <div className="dashboard-grid">
        {/* ALERTS */}

        <div className="dashboard-card">
          <div className="card-title danger">
            <TriangleAlert size={16} />

            <h3>Recent Alerts</h3>
          </div>

          <div className="alert-list">
            {alerts.map((alert) => (
              <div
                className="alert-row"
                key={alert.id}
              >
                <div className="alert-dot red" />

                <img
                  className="alert-avatar"
                  src={
                    alert.criminal
                      ?.photos?.[0]
                      ?.imageUrl
                      ? `http://localhost:5000${alert.criminal.photos[0].imageUrl}`
                      : "https://i.pravatar.cc/100"
                  }
                  alt="criminal"
                />

                <div className="alert-info">
                  <h4>
                    {
                      alert.criminal
                        ?.fullName
                    }
                  </h4>

                  <p>
                    {alert.location ||
                      "Unknown Location"}
                  </p>
                </div>

                <span className="accuracy">
                  {
                    alert.confidenceScore
                  }
                  %
                </span>

                <span className="status-pill new">
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MOST WANTED */}

        <div className="dashboard-card">
          <div className="card-title primary">
            <Shield size={16} />

            <h3>Most Wanted</h3>
          </div>

          <div className="wanted-list">
            {criminals
              .slice(0, 5)
              .map((person) => (
                <div
                  className="wanted-row"
                  key={person.id}
                >
                  <img
                    src={
                      person.photos?.[0]
                        ?.imageUrl
                        ? `http://localhost:5000${person.photos[0].imageUrl}`
                        : "https://i.pravatar.cc/80"
                    }
                    alt={
                      person.fullName
                    }
                  />

                  <div className="wanted-info">
                    <h4>
                      {
                        person.fullName
                      }
                    </h4>

                    <p>
                      {
                        person.crimeType
                      }
                    </p>
                  </div>

                  <span
                    className={`wanted-level ${person.riskLevel.toLowerCase()}`}
                  >
                    {
                      person.riskLevel
                    }
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}