import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./AdvocateDashboard.css";

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState(101);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedCase, setExpandedCase] = useState(null);
  const [caseData, setCaseData] = useState({
    filingDate: "",
    caseType: "Civil",
    category: "",
    filedCaseType: "",
    dvCase: "No",
    lawApplied: "",
    numParties: "",
  });

  const predictTimeline = (complexity) => {
    if (complexity <= 5) return "Short";
    if (complexity <= 15) return "Medium";
    return "Long";
  };

  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const predictedComplexity = Math.floor(Math.random() * 20) + 1;
    const predictedTimeline = predictTimeline(predictedComplexity);

    const newCase = {
      caseId,
      ...caseData,
      timeline: predictedTimeline,
      complexity: predictedComplexity,
      pdfFile: selectedFile ? selectedFile.name : "No File",
    };

    setCases([...cases, newCase]);
    setCaseId(caseId + 1);
    setSelectedFile(null);
    setCaseData({
      filingDate: "",
      caseType: "Civil",
      category: "",
      filedCaseType: "",
      dvCase: "No",
      lawApplied: "",
      numParties: "",
    });
  };

  const handleViewMore = (caseId) => {
    setExpandedCase(expandedCase === caseId ? null : caseId);
  };

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="container">
      <h2>📁 Case Registration & Analysis</h2>
      <form onSubmit={handleSubmit} className="case-form">
        <input type="date" name="filingDate" value={caseData.filingDate} onChange={handleChange} required />
        <select name="caseType" value={caseData.caseType} onChange={handleChange} required>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
        </select>
        <input type="text" name="category" placeholder="Category" value={caseData.category} onChange={handleChange} required />
        <input type="text" name="filedCaseType" placeholder="Filed Case Type" value={caseData.filedCaseType} onChange={handleChange} required />
        <select name="dvCase" value={caseData.dvCase} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        <input type="text" name="lawApplied" placeholder="Law Applied" value={caseData.lawApplied} onChange={handleChange} required />
        <input type="number" name="numParties" placeholder="Number of Parties" value={caseData.numParties} onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Register Case</button>
      </form>
      
      <PieChart width={400} height={400}>
        <Pie
          data={[
            { name: "Civil", value: cases.filter((c) => c.caseType === "Civil").length },
            { name: "Criminal", value: cases.filter((c) => c.caseType === "Criminal").length },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {COLORS.map((color, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      
      <h3>📌 Registered Cases</h3>
      <table className="case-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Filing Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Filed Case Type</th>
            <th>DV Case</th>
            <th>Law Applied</th>
            <th>No. of Parties</th>
            <th>Timeline</th>
            <th>Complexity</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, index) => (
            <tr key={index}>
              <td>{c.caseId}</td>
              <td>{c.filingDate}</td>
              <td>{c.caseType}</td>
              <td>{c.category}</td>
              <td>{c.filedCaseType}</td>
              <td>{c.dvCase}</td>
              <td>{c.lawApplied}</td>
              <td>{c.numParties}</td>
              <td>{c.timeline}</td>
              <td>{c.complexity}</td>
              <td>
                <button className="view-button" onClick={() => handleViewMore(c.caseId)}>View More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expandedCase !== null && (
        <div className="case-details">
          {cases.filter(c => c.caseId === expandedCase).map(c => (
            <div key={c.caseId}>
              <p><strong>Case ID:</strong> {c.caseId}</p>
              <p><strong>Filing Date:</strong> {c.filingDate}</p>
              <p><strong>Category:</strong> {c.category}</p>
              <p><strong>Filed Case Type:</strong> {c.filedCaseType}</p>
              <p><strong>DV Case:</strong> {c.dvCase}</p>
              <p><strong>Law Applied:</strong> {c.lawApplied}</p>
              <p><strong>No. of Parties:</strong> {c.numParties}</p>
              <p><strong>Complexity:</strong> {c.complexity}</p>
              <p><strong>Timeline:</strong> {c.timeline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseManagement;
