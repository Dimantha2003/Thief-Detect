import { useState } from "react";
import { X } from "lucide-react";
import { criminalApi } from "../services/criminalService";

export default function EditCriminalModal({
  criminal,
  onClose,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: criminal.fullName || "",
    nic: criminal.nic || "",
    crimeType: criminal.crimeType || "",
    riskLevel: criminal.riskLevel || "MEDIUM",
    status: criminal.status || "WANTED",
    lastKnownLocation:
      criminal.lastKnownLocation || "",
    description: criminal.description || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await criminalApi.update(
        criminal.id,
        formData
      );

      onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="criminal-modal-overlay">
      <div className="criminal-modal">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Edit Criminal Record</h2>

        <form
          className="criminal-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>NIC / ID</label>

            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Crime Type</label>

            <input
              type="text"
              name="crimeType"
              value={formData.crimeType}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Known Location</label>

            <input
              type="text"
              name="lastKnownLocation"
              value={formData.lastKnownLocation}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="WANTED">
                  WANTED
                </option>

                <option value="ARRESTED">
                  ARRESTED
                </option>

                <option value="UNDER_INVESTIGATION">
                  UNDER INVESTIGATION
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Risk Level</label>

              <select
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
              >
                <option value="LOW">LOW</option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">HIGH</option>

                <option value="CRITICAL">
                  CRITICAL
                </option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}