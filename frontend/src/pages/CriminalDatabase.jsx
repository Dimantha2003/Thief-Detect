import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { criminalApi } from "../services/criminalService";

import AddCriminalModal from "../components/AddCriminalModal";
import EditCriminalModal from "../components/EditCriminalModal";
import CriminalDetailsModal from "../components/CriminalDetailsModal";

import "../styles/criminalDatabase.css";

export default function CriminalDatabase() {
  const [criminals, setCriminals] = useState([]);

  const [filteredCriminals, setFilteredCriminals] =
    useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedCriminal, setSelectedCriminal] =
    useState(null);

  const [editCriminal, setEditCriminal] =
    useState(null);

  const loadCriminals = async () => {
    try {
      const response = await criminalApi.getAll();

      if (response.success) {
        setCriminals(response.data);
        setFilteredCriminals(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCriminals();
  }, []);

  useEffect(() => {
    let data = [...criminals];

    if (searchTerm) {
      data = data.filter(
        (person) =>
          person.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          person.criminalCode
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      data = data.filter(
        (person) => person.status === statusFilter
      );
    }

    setFilteredCriminals(data);
  }, [searchTerm, statusFilter, criminals]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this criminal?"
    );

    if (!confirmed) return;

    try {
      await criminalApi.delete(id);

      loadCriminals();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <section className="criminal-page">
      <div className="criminal-header">
        <div>
          <h1>Criminal Database</h1>

          <p>
            {filteredCriminals.length} active records
          </p>
        </div>

        <button
          className="add-record-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={17} />
          Add Record
        </button>
      </div>

      <div className="criminal-toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="filter-box">
          <SlidersHorizontal size={18} />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="ALL">All Status</option>
            <option value="WANTED">WANTED</option>
            <option value="ARRESTED">ARRESTED</option>
            <option value="UNDER_INVESTIGATION">
              UNDER INVESTIGATION
            </option>
          </select>
        </div>
      </div>

      <div className="criminal-grid">
        {filteredCriminals.map((person) => {
          const primaryPhoto =
            person.photos &&
            person.photos.length > 0
              ? `http://localhost:5000${person.photos[0].imageUrl}`
              : "https://i.pravatar.cc/100?img=12";

          return (
            <article
              className="criminal-card"
              key={person.id}
            >
              <div className="criminal-card-top">
                <img
                  src={primaryPhoto}
                  alt={person.fullName}
                />

                <div>
                  <h3>{person.fullName}</h3>

                  <p>{person.nic}</p>

                  <span>
                    {person.criminalCode}
                  </span>
                </div>
              </div>

              <div className="crime-tags">
                <span>{person.crimeType}</span>
              </div>

              <div className="criminal-status-row">
                <span
                  className={`status-badge ${person.status
                    .toLowerCase()
                    .replaceAll("_", "-")}`}
                >
                  {person.status}
                </span>

                <span
                  className={`risk-badge ${person.riskLevel.toLowerCase()}`}
                >
                  {person.riskLevel}
                </span>
              </div>

              <p className="last-seen">
                Last seen:{" "}
                {person.lastKnownLocation ||
                  "Unknown"}
              </p>

              <div className="card-actions">
                <button
                  onClick={() =>
                    setSelectedCriminal(person)
                  }
                >
                  View
                </button>

                <button
                  onClick={() =>
                    setEditCriminal(person)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(person.id)
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <AddCriminalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={loadCriminals}
      />

      {selectedCriminal && (
        <CriminalDetailsModal
          criminal={selectedCriminal}
          onClose={() =>
            setSelectedCriminal(null)
          }
        />
      )}

      {editCriminal && (
        <EditCriminalModal
          criminal={editCriminal}
          onClose={() => setEditCriminal(null)}
          onRefresh={loadCriminals}
        />
      )}
    </section>
  );
}