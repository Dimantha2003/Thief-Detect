function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Criminals</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Active Cameras</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Today Alerts</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Pending Alerts</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;