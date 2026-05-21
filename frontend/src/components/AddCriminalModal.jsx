import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { criminalApi } from "../services/criminalService";

export default function AddCriminalModal({
  isOpen,
  onClose,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    crimeType: "",
    riskLevel: "MEDIUM",
    status: "WANTED",
    lastKnownLocation: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) =>
        submitData.append(key, formData[key])
      );

      Array.from(files).forEach((file) =>
        submitData.append("photos", file)
      );

      await criminalApi.create(submitData);

      onRefresh();
      onClose();
    } catch (error) {
      console.error(error);

      alert("Failed to add criminal");
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

        <h2>Add New Criminal</h2>

        <form
          className="criminal-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Full Name</label>

            <input
              required
              type="text"
              name="fullName"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>NIC / ID</label>

            <input
              type="text"
              name="nic"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Crime Type</label>

            <input
              required
              type="text"
              name="crimeType"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Known Location</label>

            <input
              type="text"
              name="lastKnownLocation"
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
              onChange={handleChange}
            />
          </div>

          <div className="upload-box">
            <UploadCloud size={40} />

            <p>Upload up to 5 mugshots</p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Criminal"}
          </button>
        </form>
      </div>
    </div>
  );
}