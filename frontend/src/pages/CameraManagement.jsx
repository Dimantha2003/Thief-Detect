import {
  Camera,
  Wifi,
  WifiOff,
  Wrench,
} from "lucide-react";
import "../styles/cameraManagement.css";

const cameras = [
  {
    id: "CAM-001",
    name: "North Gate Entry",
    location: "Sector 1 North Gate",
    status: "online",
    signal: "online",
    last: "3/3/2026",
  },
  {
    id: "CAM-002",
    name: "Market Square",
    location: "Central Market Plaza",
    status: "online",
    signal: "online",
  },
  {
    id: "CAM-003",
    name: "Boulevard Cam",
    location: "Main Boulevard - Sector 7",
    status: "online",
    signal: "online",
    last: "3/3/2026",
  },
  {
    id: "CAM-004",
    name: "Park Avenue",
    location: "F-7 Park Avenue",
    status: "offline",
    signal: "offline",
  },
  {
    id: "CAM-005",
    name: "Commercial Block C",
    location: "Commercial Area Block C",
    status: "online",
    signal: "online",
    last: "3/2/2026",
  },
  {
    id: "CAM-006",
    name: "University Gate",
    location: "University Main Entrance",
    status: "online",
    signal: "online",
  },
  {
    id: "CAM-007",
    name: "Industrial Gate",
    location: "Industrial Zone Gate",
    status: "online",
    signal: "online",
    last: "3/3/2026",
  },
  {
    id: "CAM-008",
    name: "Hospital Road",
    location: "City Hospital Junction",
    status: "maintenance",
    signal: "maintenance",
  },
  {
    id: "CAM-009",
    name: "Railway Station",
    location: "Central Railway Platform",
    status: "online",
    signal: "online",
  },
  {
    id: "CAM-010",
    name: "Bus Terminal",
    location: "Main Bus Terminal",
    status: "online",
    signal: "online",
  },
  {
    id: "CAM-011",
    name: "Shopping Mall",
    location: "Centaurus Mall Entry",
    status: "online",
    signal: "online",
  },
  {
    id: "CAM-012",
    name: "Toll Plaza",
    location: "Highway Toll Plaza",
    status: "online",
    signal: "online",
    last: "3/3/2026",
  },
];

function SignalIcon({ signal }) {
  if (signal === "offline") return <WifiOff size={15} className="signal offline" />;
  if (signal === "maintenance") return <Wrench size={15} className="signal maintenance" />;
  return <Wifi size={15} className="signal online" />;
}

export default function CameraManagement() {
  const onlineCount = cameras.filter((camera) => camera.status === "online").length;

  return (
    <section className="camera-page">
      <div className="camera-page-header">
        <h1>Camera Management</h1>
        <p>{onlineCount}/{cameras.length} cameras online</p>
      </div>

      <div className="camera-grid">
        {cameras.map((cam) => (
          <article className="camera-card" key={cam.id}>
            <div className="camera-card-top">
              <div className="camera-id">
                <Camera size={14} />
                <span>{cam.id}</span>
              </div>

              <SignalIcon signal={cam.signal} />
            </div>

            <div className="camera-info">
              <h3>{cam.name}</h3>
              <p>{cam.location}</p>
            </div>

            <div className={`camera-feed ${cam.status}`}>
              {cam.status === "online" ? (
                <>
                  <span className="live-indicator">
                    <i></i> LIVE
                  </span>
                  <p>Feed Active</p>
                </>
              ) : (
                <p>No Signal</p>
              )}
            </div>

            <div className="camera-card-bottom">
              <span className={`camera-status ${cam.status}`}>
                {cam.status}
              </span>

              {cam.last && <small>Last: {cam.last}</small>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}