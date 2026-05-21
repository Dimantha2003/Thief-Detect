import {
  TriangleAlert,
  Radio,
  Clock,
  CheckCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import { alertApi } from "../services/alertService";

import "../styles/alertHistory.css";

function AlertIcon({ type }) {
  if (type === "signal") {
    return <Radio size={20} />;
  }

  if (type === "warning") {
    return <Clock size={20} />;
  }

  if (type === "success") {
    return <CheckCircle size={20} />;
  }

  return <TriangleAlert size={20} />;
}

export default function AlertHistory() {
  const [alerts, setAlerts] = useState([]);

  // ==========================================
  // LOAD ALERTS
  // ==========================================
  const loadAlerts = async () => {
    try {
      const response = await alertApi.getAll();

      if (response.success) {
        setAlerts(response.data);
      }
    } catch (error) {
      console.error(
        "Failed to load alerts",
        error
      );
    }
  };

  // ==========================================
  // AUTO REFRESH
  // ==========================================
  useEffect(() => {
    loadAlerts();

    // REFRESH EVERY 5 SECONDS
    const interval = setInterval(() => {
      loadAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // STATUS → UI TYPE
  // ==========================================
  const getAlertType = (status) => {
    if (status === "NEW") {
      return "danger";
    }

    if (status === "REVIEWING") {
      return "signal";
    }

    if (status === "CONFIRMED") {
      return "warning";
    }

    return "success";
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================
  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <section className="alert-history-page">
      <div className="alert-history-header">
        <h1>Alert History</h1>

        <p>
          Real-time criminal detection
          logs and AI recognition alerts
        </p>
      </div>

      <div className="alert-history-list">
        {alerts.length === 0 ? (
          <div className="empty-alerts">
            <TriangleAlert size={40} />

            <h3>No alerts yet</h3>

            <p>
              AI detections will appear here
              automatically
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
            const criminal =
              alert.criminal;

            const image =
              criminal?.photos?.[0]
                ?.imageUrl
                ? `http://localhost:5000${criminal.photos[0].imageUrl}`
                : "https://i.pravatar.cc/100";

            const detectedDate =
              new Date(alert.detectedAt);

            return (
              <article
                className="history-card"
                key={alert.id}
              >
                {/* ICON */}

                <div
                  className={`history-icon ${getAlertType(alert.status)}`}
                >
                  <AlertIcon
                    type={getAlertType(
                      alert.status
                    )}
                  />
                </div>

                {/* CRIMINAL IMAGE */}

                <img
                  className="history-avatar"
                  src={image}
                  alt={
                    criminal?.fullName
                  }
                />

                {/* CONTENT */}

                <div className="history-content">
                  <div className="history-title">
                    <h3>
                      {criminal?.fullName ||
                        "Unknown Criminal"}
                    </h3>

                    <span>
                      {
                        alert.alertCode
                      }
                    </span>
                  </div>

                  <p>
                    Detected at{" "}
                    <strong>
                      {alert.location ||
                        "Unknown Location"}
                    </strong>

                    {" "}via AI surveillance
                  </p>

                  <div className="history-extra">
                    <span>
                      Crime:
                      {" "}
                      {
                        criminal?.crimeType
                      }
                    </span>

                    <span>
                      Risk:
                      {" "}
                      {
                        criminal?.riskLevel
                      }
                    </span>
                  </div>
                </div>

                {/* META */}

                <div className="history-meta">
                  <span
                    className={`history-status ${getStatusClass(alert.status)}`}
                  >
                    {alert.status}
                  </span>

                  <small>
                    {detectedDate.toLocaleDateString()}
                    {" • "}
                    {detectedDate.toLocaleTimeString()}
                  </small>

                  <strong>
                    {
                      alert.confidenceScore
                    }
                    % confidence
                  </strong>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}