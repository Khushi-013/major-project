// components/dashboards/JudgeDashboard.js
import React from "react";
import { Bar, Pie } from "react-chartjs-2"; // Assuming you're using react-chartjs-2 for graphs
import "chart.js/auto";

const JudgeDashboard = () => {
  const caseData = {
    labels: ["Pending", "Completed", "Upcoming"],
    datasets: [
      {
        label: "Cases",
        data: [15, 25, 10],
        backgroundColor: ["#f39c12", "#27ae60", "#2980b9"],
      },
    ],
  };

  const recentCases = [
    {
      caseId: "CR123",
      date: "2024-09-10",
      time: "10:00 AM",
      reason: "Property Dispute",
      status: "Pending",
    },
    {
      caseId: "CR124",
      date: "2024-09-11",
      time: "11:30 AM",
      reason: "Theft",
      status: "Completed",
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Judge Dashboard</h2>
      </header>

      <div className="dashboard-stats">
        <div className="card">
          <h4>Total Cases</h4>
          <p>50</p>
        </div>
        <div className="card">
          <h4>Pending Cases</h4>
          <p>15</p>
        </div>
        <div className="card">
          <h4>Completed Cases</h4>
          <p>25</p>
        </div>
        <div className="card">
          <h4>Upcoming Hearings</h4>
          <p>10</p>
        </div>
      </div>

      <div className="recent-cases">
        <h3>Recent Cases</h3>
        <table className="case-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentCases.map((caseItem) => (
              <tr key={caseItem.caseId}>
                <td>{caseItem.caseId}</td>
                <td>{caseItem.date}</td>
                <td>{caseItem.time}</td>
                <td>{caseItem.reason}</td>
                <td>{caseItem.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="case-charts">
        <h3>Case Statistics</h3>
        <div className="chart-container">
          <Bar data={caseData} />
          <Pie data={caseData} />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Judge Dashboard</p>
      </footer>
    </div>
  );
};

export default JudgeDashboard;
