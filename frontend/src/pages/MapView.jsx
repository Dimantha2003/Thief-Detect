import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/mapView.css";

const cameraLocations = [
  {
    id: "CAM-001",
    name: "Colombo Fort Camera",
    city: "Colombo",
    status: "online",
    lat: 6.9344,
    lng: 79.8428,
  },
  {
    id: "CAM-002",
    name: "Pettah Junction Camera",
    city: "Colombo",
    status: "offline",
    lat: 6.9369,
    lng: 79.8501,
  },
  {
    id: "CAM-003",
    name: "Kandy Clock Tower Camera",
    city: "Kandy",
    status: "online",
    lat: 7.2906,
    lng: 80.6337,
  },
  {
    id: "CAM-004",
    name: "Galle Face Camera",
    city: "Colombo",
    status: "alert",
    lat: 6.9271,
    lng: 79.8462,
  },
  {
    id: "CAM-005",
    name: "Negombo Main Street Camera",
    city: "Negombo",
    status: "maintenance",
    lat: 7.2083,
    lng: 79.8358,
  },
  {
    id: "CAM-006",
    name: "Galle Bus Stand Camera",
    city: "Galle",
    status: "online",
    lat: 6.0535,
    lng: 80.221,
  },
  {
    id: "CAM-007",
    name: "Jaffna Town Camera",
    city: "Jaffna",
    status: "online",
    lat: 9.6615,
    lng: 80.0255,
  },
  {
    id: "CAM-008",
    name: "Matara Junction Camera",
    city: "Matara",
    status: "offline",
    lat: 5.9485,
    lng: 80.5353,
  },
];

const activeAlerts = [
  {
    name: "Ahmed Khan",
    location: "Colombo Fort",
    time: "2:23:00 PM",
    status: "new",
    accuracy: "94.2%",
  },
  {
    name: "Rashid Ali",
    location: "Pettah Junction",
    time: "1:45:00 PM",
    status: "dispatched",
    accuracy: "87.8%",
  },
  {
    name: "Usman Tariq",
    location: "Galle Face",
    time: "12:10:00 PM",
    status: "acknowledged",
    accuracy: "91.5%",
  },
];

const markerColors = {
  online: "#22c55e",
  offline: "#ef4444",
  alert: "#ef4444",
  maintenance: "#f59e0b",
};

export default function MapView() {
  return (
    <section className="map-page">
      <div className="map-header">
        <h1>Surveillance Map</h1>
        <p>Live camera and alert locations across Sri Lanka</p>
      </div>

      <div className="map-legend">
        <span>
          <i className="legend-dot online"></i> Online
        </span>
        <span>
          <i className="legend-dot offline"></i> Offline / Alert
        </span>
        <span>
          <i className="legend-dot maintenance"></i> Maintenance
        </span>
      </div>

      <div className="map-layout">
        <div className="map-card real-map-card">
          <MapContainer
            center={[7.8731, 80.7718]}
            zoom={8}
            scrollWheelZoom={true}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {cameraLocations.map((camera) => (
              <CircleMarker
                key={camera.id}
                center={[camera.lat, camera.lng]}
                radius={camera.status === "alert" ? 11 : 8}
                pathOptions={{
                  color: markerColors[camera.status],
                  fillColor: markerColors[camera.status],
                  fillOpacity: 0.9,
                  weight: 3,
                }}
              >
                <Popup>
                  <strong>{camera.name}</strong>
                  <br />
                  ID: {camera.id}
                  <br />
                  City: {camera.city}
                  <br />
                  Status: {camera.status}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <aside className="active-alerts-panel">
          <h3>Active Alerts</h3>

          <div className="map-alert-list">
            {activeAlerts.map((alert, index) => (
              <div className="map-alert-card" key={index}>
                <div className="map-alert-top">
                  <h4>{alert.name}</h4>
                  <span className={`map-alert-status ${alert.status}`}>
                    {alert.status}
                  </span>
                </div>

                <p>{alert.location}</p>

                <div className="map-alert-bottom">
                  <span>{alert.time}</span>
                  <strong>{alert.accuracy} match</strong>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}