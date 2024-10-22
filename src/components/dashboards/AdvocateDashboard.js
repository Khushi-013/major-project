import React, { useState } from 'react';
import './AdvocateDashboard.css';

const AdvocateDashboard = () => {
  const [caseNo, setCaseNo] = useState('');
  const [caseType, setCaseType] = useState('');
  const [desgCode, setDesgCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [predictedTimeline, setPredictedTimeline] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePredictTimeline = async (e) => {
    e.preventDefault();
    
    // Prepare the request body
    const requestBody = {
      case_no: caseNo,
      type_name: caseType,
      desgcode: parseInt(desgCode),
      district_code: parseInt(districtCode),
      state_code: parseInt(stateCode),
    };

    try {
      // Send a POST request to the backend API
      const response = await fetch('http://localhost:5000/api/predict-timeline', { // Ensure to use full URL for local development
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPredictedTimeline(data.predicted_timeline); // Assuming your backend returns { predicted_timeline: ... }
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to fetch prediction. Please check the input data.');
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="advocate-dashboard">
      <div className="stats-cards">
        <div className="card">
          <h3>Client Requests</h3>
          <p>15</p>
        </div>
        <div className="card">
          <h3>Total Pending Cases</h3>
          <p>30</p>
        </div>
        <div className="card">
          <h3>Upcoming Hearings</h3>
          <p>5</p>
        </div>
      </div>

      <h2>Predict Case Timeline</h2>
      <form onSubmit={handlePredictTimeline}>
        <input
          type="text"
          placeholder="Enter Case Number"
          value={caseNo}
          onChange={(e) => setCaseNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Case Type"
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter Designation Code"
          value={desgCode}
          onChange={(e) => setDesgCode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter District Code"
          value={districtCode}
          onChange={(e) => setDistrictCode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter State Code"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          required
        />
        <button type="submit">Predict Timeline</button>
      </form>

      {predictedTimeline !== null && (
        <div className="prediction-result">
          <h3>Predicted Timeline:</h3>
          <p>{predictedTimeline.toFixed(2)} days</p>
        </div>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <h2>Recent Client Requests</h2>
      <table className="recent-requests-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Case Type</th>
            <th>Request Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Property Dispute</td>
            <td>2024-09-22</td>
            <td>Pending</td>
          </tr>
          {/* More client requests */}
        </tbody>
      </table>

      <h2>Upload Client Documents</h2>
      <div className="upload-documents">
        <input type="file" multiple />
        <button>Upload</button>
      </div>

      <h2>Upcoming Hearings</h2>
      <ul className="hearing-list">
        <li>Case #00123: 2024-09-25 at 10:00 AM</li>
        {/* More upcoming hearings */}
      </ul>
    </div>
  );
};

export default AdvocateDashboard;
