import React, { useState, useEffect } from 'react';
import '../styles/CasesPage.css';  // Import the CSS styles for the page
import Papa from 'papaparse';

// Import the CSV file from src/assets
import caseDetailsCsv from '../assets/case_details.csv';
import Header from '../components/Header'; // Import your Header component
import Footer from '../components/Footer'; // Import your Footer component

const CasesPage = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // To track the search term
    const [selectedCase, setSelectedCase] = useState(null); // To track the selected case for viewing details

    // Fetch and parse the CSV file
    useEffect(() => {
        fetch(caseDetailsCsv)
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        const parsedData = results.data.map((row) => ({
                            cino: row.cino,
                            case_no: row.case_no,
                            court_name: row.court_name,
                            date_of_filing: row.date_of_filing,
                            date_of_decision: row.date_of_decision,
                            disp_name: row.disp_name,
                        }));
                        setCases(parsedData);
                        setLoading(false); // Stop loading
                    },
                });
            });
    }, []);

    // Handle the search functionality
    const handleSearch = () => {
        return cases.filter(
            (caseItem) =>
                caseItem.case_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.cino?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Show loading while fetching data
    if (loading) {
        return <div>Loading cases...</div>;
    }

    // Display the complete case details when a case is selected
    const viewCaseDetails = (caseItem) => {
        setSelectedCase(caseItem);
    };

    return (
        <div>
            <Header /> {/* Add Header Component */}

            <div className="cases-container">
                <h2>Cases Page</h2>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Case Number or CINO"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* Table of Cases */}
                <table className="cases-table">
                    <thead>
                        <tr>
                            <th>CINO</th>
                            <th>Case Number</th>
                            <th>Court Name</th>
                            <th>Date of Filing</th>
                            <th>Date of Decision</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {handleSearch().map((caseItem, index) => (
                            <tr key={index}>
                                <td>{caseItem.cino}</td>
                                <td>{caseItem.case_no}</td>
                                <td>{caseItem.court_name}</td>
                                <td>{caseItem.date_of_filing}</td>
                                <td>{caseItem.date_of_decision}</td>
                                <td>{caseItem.disp_name}</td>
                                <td>
                                    <button className="view-button" onClick={() => viewCaseDetails(caseItem)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Display selected case details */}
                {selectedCase && (
                    <div className="case-details">
                        <h3>Case Details</h3>
                        <p><strong>CINO:</strong> {selectedCase.cino}</p>
                        <p><strong>Case Number:</strong> {selectedCase.case_no}</p>
                        <p><strong>Court Name:</strong> {selectedCase.court_name}</p>
                        <p><strong>Date of Filing:</strong> {selectedCase.date_of_filing}</p>
                        <p><strong>Date of Decision:</strong> {selectedCase.date_of_decision}</p>
                        <p><strong>Status:</strong> {selectedCase.disp_name}</p>
                        <button className="close-button" onClick={() => setSelectedCase(null)}>Close</button>
                    </div>
                )}

                {/* Additional Action Buttons */}
                <div className="actions">
                    <button className="action-button">Generate Case Report</button>
                    <button className="action-button">Assign Judge</button>
                    <button className="action-button">Update Status</button>
                </div>
            </div>

            <Footer /> {/* Add Footer Component */}
        </div>
    );
};

export default CasesPage;
