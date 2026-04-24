import { Plus, Search, SlidersHorizontal } from "lucide-react";
import "../styles/criminalDatabase.css";

const criminals = [
  {
    name: "Ahmed Khan",
    id: "PKT-29384-A",
    code: "CR-001",
    image: "https://i.pravatar.cc/100?img=12",
    crimes: ["Armed Robbery", "Assault"],
    status: "wanted",
    risk: "high",
    lastSeen: "Sector 7, Main Boulevard",
  },
  {
    name: "Bilal Hussain",
    id: "PKT-18273-B",
    code: "CR-002",
    image: "https://i.pravatar.cc/100?img=11",
    crimes: ["Fraud", "Identity Theft"],
    status: "under surveillance",
    risk: "medium",
    lastSeen: "Commercial Area, Block C",
  },
  {
    name: "Rashid Ali",
    id: "PKT-47291-C",
    code: "CR-003",
    image: "https://i.pravatar.cc/100?img=33",
    crimes: ["Murder", "Drug Trafficking"],
    status: "wanted",
    risk: "critical",
    lastSeen: "Industrial Zone",
  },
  {
    name: "Faisal Mehmood",
    id: "PKT-83921-D",
    code: "CR-004",
    image: "https://i.pravatar.cc/100?img=53",
    crimes: ["Burglary"],
    status: "arrested",
    risk: "low",
    lastSeen: "Unknown",
  },
  {
    name: "Usman Tariq",
    id: "PKT-56382-E",
    code: "CR-005",
    image: "https://i.pravatar.cc/100?img=15",
    crimes: ["Kidnapping", "Extortion"],
    status: "wanted",
    risk: "critical",
    lastSeen: "Highway Toll Plaza",
  },
];

export default function CriminalDatabase() {
  return (
    <section className="criminal-page">
      <div className="criminal-header">
        <div>
          <h1>Criminal Database</h1>
          <p>{criminals.length} records found</p>
        </div>

        <button className="add-record-btn">
          <Plus size={17} />
          Add Record
        </button>
      </div>

      <div className="criminal-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search by name or ID..." />
        </div>

        <div className="filter-box">
          <SlidersHorizontal size={18} />
          <select>
            <option>All Status</option>
            <option>Wanted</option>
            <option>Under Surveillance</option>
            <option>Arrested</option>
          </select>
        </div>
      </div>

      <div className="criminal-grid">
        {criminals.map((person) => (
          <article className="criminal-card" key={person.code}>
            <div className="criminal-card-top">
              <img src={person.image} alt={person.name} />

              <div>
                <h3>{person.name}</h3>
                <p>{person.id}</p>
                <span>{person.code}</span>
              </div>
            </div>

            <div className="crime-tags">
              {person.crimes.map((crime) => (
                <span key={crime}>{crime}</span>
              ))}
            </div>

            <div className="criminal-status-row">
              <span className={`status-badge ${person.status.replaceAll(" ", "-")}`}>
                {person.status}
              </span>

              <span className={`risk-badge ${person.risk}`}>
                {person.risk}
              </span>
            </div>

            <p className="last-seen">Last seen: {person.lastSeen}</p>
          </article>
        ))}
      </div>
    </section>
  );
}