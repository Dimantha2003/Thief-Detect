import { X, MapPin, ShieldAlert, BadgeAlert } from "lucide-react";

export default function CriminalDetailsModal({
  criminal,
  onClose,
}) {
  if (!criminal) return null;

  return (
    <div className="criminal-modal-overlay">
      <div className="criminal-modal details-modal">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="details-header">
          <img
            src={
              criminal.photos?.length > 0
                ? `http://localhost:5000${criminal.photos[0].imageUrl}`
                : "https://i.pravatar.cc/150"
            }
            alt={criminal.fullName}
            className="details-main-image"
          />

          <div>
            <h2>{criminal.fullName}</h2>

            <p className="criminal-code">
              {criminal.criminalCode}
            </p>

            <div className="details-badges">
              <span
                className={`status-badge ${criminal.status
                  .toLowerCase()
                  .replaceAll("_", "-")}`}
              >
                {criminal.status}
              </span>

              <span
                className={`risk-badge ${criminal.riskLevel.toLowerCase()}`}
              >
                {criminal.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* ALL IMAGES */}
        <div className="photo-gallery">
          {criminal.photos?.map((photo) => (
            <img
              key={photo.id}
              src={`http://localhost:5000${photo.imageUrl}`}
              alt="criminal"
            />
          ))}
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <ShieldAlert size={18} />
            <div>
              <span>Crime Type</span>
              <p>{criminal.crimeType}</p>
            </div>
          </div>

          <div className="detail-card">
            <BadgeAlert size={18} />
            <div>
              <span>NIC / ID</span>
              <p>{criminal.nic || "Not Available"}</p>
            </div>
          </div>

          <div className="detail-card">
            <MapPin size={18} />
            <div>
              <span>Last Known Location</span>
              <p>
                {criminal.lastKnownLocation ||
                  "Unknown"}
              </p>
            </div>
          </div>
        </div>

        <div className="description-box">
          <h4>Description</h4>

          <p>
            {criminal.description ||
              "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}