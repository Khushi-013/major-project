// ClerkDashboard.js
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "../../styles/ClerkDashboard.css";

const ClerkDashboard = () => {
  const [hearingSchedule, setHearingSchedule] = useState([
    {
      caseId: "CR125",
      date: "2024-09-12",
      time: "2:00 PM",
      judge: "Judge Rao",
      status: "Scheduled",
    },
    {
      caseId: "CR126",
      date: "2024-09-13",
      time: "3:30 PM",
      judge: "Judge Iyer",
      status: "Scheduled",
    },
  ]);

  const priorityCases = [
    {
      caseId: "CR127",
      complexityScore: 85,
      description: "Financial fraud case involving multiple accounts.",
    },
    {
      caseId: "CR128",
      complexityScore: 65,
      description: "Land dispute involving 3 parties.",
    },
  ];

  const caseTrendData = {
    labels: ["July", "August", "September", "October"],
    datasets: [
      {
        label: "Cases Filed",
        data: [30, 45, 50, 35],
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 140, 0, 1)",
        fill: true,
      },
    ],
  };

  const handleSchedule = (caseId) => {
    const caseToSchedule = priorityCases.find((c) => c.caseId === caseId);
    setHearingSchedule([...hearingSchedule, {
      ...caseToSchedule,
      date: "2024-09-14",
      time: "11:00 AM",
      judge: "Judge Sharma",
      status: "Scheduled",
    }]);
    alert(`${caseId} scheduled!`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Clerk Dashboard</h2>
      </header>

      <div className="dashboard-stats">
        <div className="card"><h4>Total Cases</h4><p>100</p></div>
        <div className="card"><h4>Scheduled Hearings</h4><p>{hearingSchedule.length}</p></div>
      </div>

      <div className="priority-section">
        <h3>Priority Cases (Unscheduled)</h3>
        <table className="case-table">
          <thead>
            <tr><th>Case ID</th><th>Complexity</th><th>Description</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {priorityCases.map((c) => (
              <tr key={c.caseId}>
                <td>{c.caseId}</td>
                <td>{c.complexityScore}</td>
                <td>{c.description}</td>
                <td>
                  <ul className="action-list">
                    <li onClick={() => handleSchedule(c.caseId)}>📅 Schedule</li>
                    <li>📄 View Docs</li>
                    <li>🧠 Summarize</li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hearing-schedule">
        <h3>Upcoming Hearings</h3>
        <table className="case-table">
          <thead>
            <tr><th>Case ID</th><th>Date</th><th>Time</th><th>Judge</th><th>Status</th></tr>
          </thead>
          <tbody>
            {hearingSchedule.map((h) => (
              <tr key={h.caseId}>
                <td>{h.caseId}</td>
                <td>{h.date}</td>
                <td>{h.time}</td>
                <td>{h.judge}</td>
                <td>{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="case-trend">
        <h3>Case Filing Trends</h3>
        <div className="chart-container">
          <Line data={caseTrendData} />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Clerk Dashboard</p>
      </footer>
    </div>
  );
};

export default ClerkDashboard;