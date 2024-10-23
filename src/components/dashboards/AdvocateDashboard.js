import React, { useState } from 'react';
import './AdvocateDashboard.css';
import Chart from 'react-apexcharts';

const AdvocateDashboard = () => {
  const [caseId, setCaseId] = useState('');
  const [caseFilingDate, setCaseFilingDate] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseCategory, setCaseCategory] = useState('');
  const [filedCaseType, setFiledCaseType] = useState('');
  const [dvCase, setDvCase] = useState('');
  const [lawsApplied, setLawsApplied] = useState('');
  const [partiesInvolved, setPartiesInvolved] = useState('');
  const [relevantDoc, setRelevantDoc] = useState(null); // For relevant document upload
  const [otherProofs, setOtherProofs] = useState(null); // For other proofs upload
  const [registeredCases, setRegisteredCases] = useState([]);
  const [expandedCaseId, setExpandedCaseId] = useState(null);
  
  // Function to register a new case
  const handleRegisterCase = (e) => {
    e.preventDefault();
    
    const complexityScore = Math.floor(Math.random() * 100); // Automatically calculate complexity score
    const timeline = 'To be fetched'; // Placeholder for timeline

    const newCase = {
      caseId,
      caseFilingDate,
      caseType,
      caseCategory,
      filedCaseType,
      dvCase,
      lawsApplied,
      partiesInvolved,
      relevantDoc,
      otherProofs,
      complexityScore,
      timeline, // Placeholder for timeline
    };

    // Add new case to the state
    setRegisteredCases((prevCases) => [...prevCases, newCase]);

    // Reset form fields after submission
    resetForm();
  };

  const resetForm = () => {
    setCaseId('');
    setCaseFilingDate('');
    setCaseType('');
    setCaseCategory('');
    setFiledCaseType('');
    setDvCase('');
    setLawsApplied('');
    setPartiesInvolved('');
    setRelevantDoc(null);
    setOtherProofs(null);
  };

  // Function to display pie chart data
  const getChartData = () => {
    const caseTypeCounts = registeredCases.reduce((acc, caseItem) => {
      acc[caseItem.caseType] = (acc[caseItem.caseType] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(caseTypeCounts);
    const series = Object.values(caseTypeCounts);
    return { labels, series };
  };

  const { labels, series } = getChartData();

  const handleViewClick = (caseId) => {
    setExpandedCaseId(expandedCaseId === caseId ? null : caseId);
  };

  const handleEditClick = (caseData) => {
    setCaseId(caseData.caseId);
    setCaseFilingDate(caseData.caseFilingDate);
    setCaseType(caseData.caseType);
    setCaseCategory(caseData.caseCategory);
    setFiledCaseType(caseData.filedCaseType);
    setDvCase(caseData.dvCase);
    setLawsApplied(caseData.lawsApplied);
    setPartiesInvolved(caseData.partiesInvolved);
    setRelevantDoc(caseData.relevantDoc);
    setOtherProofs(caseData.otherProofs);
    
    setExpandedCaseId(caseData.caseId); // Expand the details for the selected case
  };

  return (
    <div className="advocate-dashboard">
      <h2>Advocate Dashboard</h2>

      <h3>Register New Case</h3>
      <form onSubmit={handleRegisterCase}>
        <input
          type="text"
          placeholder="Enter Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Case Filing Date"
          value={caseFilingDate}
          onChange={(e) => setCaseFilingDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Case Type (e.g., Civil, Criminal)"
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Case Category (e.g., Property, Family)"
          value={caseCategory}
          onChange={(e) => setCaseCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Filed Case Type"
          value={filedCaseType}
          onChange={(e) => setFiledCaseType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="DV Case (Yes/No)"
          value={dvCase}
          onChange={(e) => setDvCase(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Laws Applied (e.g., IPC 420, IPC 302)"
          value={lawsApplied}
          onChange={(e) => setLawsApplied(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Parties Involved"
          value={partiesInvolved}
          onChange={(e) => setPartiesInvolved(e.target.value)}
          required
        />

        <label htmlFor="relevantDocUpload">Upload Relevant Document:</label>
        <input
          type="file"
          id="relevantDocUpload"
          onChange={(e) => setRelevantDoc(e.target.files[0])}
          accept="application/pdf"
          required
        />

        <label htmlFor="otherProofsUpload">Upload Other Proofs:</label>
        <input
          type="file"
          id="otherProofsUpload"
          onChange={(e) => setOtherProofs(e.target.files[0])}
          accept="application/pdf"
        />

        <button type="submit">Register Case</button>
      </form>

      <h2>Registered Cases</h2>
      <table className="case-details-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Case Filing Date</th>
            <th>Case Type</th>
            <th>Case Category</th>
            <th>Complexity Score</th>
            <th>Timeline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registeredCases.map((caseItem, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{caseItem.caseId}</td>
                <td>{caseItem.caseFilingDate}</td>
                <td>{caseItem.caseType}</td>
                <td>{caseItem.caseCategory}</td>
                <td>{caseItem.complexityScore}</td>
                <td>{caseItem.timeline}</td>
                <td>
                  <select onChange={(e) => {
                    if (e.target.value === "view") handleViewClick(caseItem.caseId);
                    else if (e.target.value === "edit") handleEditClick(caseItem);
                    e.target.value = ""; // Reset selection
                  }}>
                    <option value="">Actions</option>
                    <option value="view">View</option>
                    <option value="edit">Edit</option>
                  </select>
                </td>
              </tr>
              {expandedCaseId === caseItem.caseId && (
                <tr>
                  <td colSpan="7">
                    <div className="case-details">
                      <h4>Case Details</h4>
                      <p><strong>Case ID:</strong> {caseItem.caseId}</p>
                      <p><strong>Case Filing Date:</strong> {caseItem.caseFilingDate}</p>
                      <p><strong>Case Type:</strong> {caseItem.caseType}</p>
                      <p><strong>Case Category:</strong> {caseItem.caseCategory}</p>
                      <p><strong>Filed Case Type:</strong> {caseItem.filedCaseType}</p>
                      <p><strong>DV Case:</strong> {caseItem.dvCase}</p>
                      <p><strong>Laws Applied:</strong> {caseItem.lawsApplied}</p>
                      <p><strong>Parties Involved:</strong> {caseItem.partiesInvolved}</p>
                      <p><strong>Relevant Document:</strong> 
                        {caseItem.relevantDoc ? (
                          <a href={URL.createObjectURL(caseItem.relevantDoc)} target="_blank" rel="noopener noreferrer">
                            {caseItem.relevantDoc.name}
                          </a>
                        ) : 'None'}
                      </p>
                      <p><strong>Other Proofs:</strong> 
                        {caseItem.otherProofs ? (
                          <a href={URL.createObjectURL(caseItem.otherProofs)} target="_blank" rel="noopener noreferrer">
                            {caseItem.otherProofs.name}
                          </a>
                        ) : 'None'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="charts-section">
      <Chart
        options={{
          chart: {
            id: 'case-type-chart',
          },
          labels: labels, // Use the labels directly for the pie chart
        }}
        series={series}
        type="pie" // Change the chart type to "pie"
        width="500"
      />
    </div>
  </div>
  );
};

export default AdvocateDashboard;
