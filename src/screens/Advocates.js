import React, { useState } from "react";
import "../styles/Advocates.css";

const Advocates = () => {
  const defaultAdvocates = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      specialization: "Family Law",
      availability: true,
      contact: "priya.sharma@lawfirm.com",
      phone: "+91-9876543210",
      bio: "Experienced in divorce cases, child custody, and family disputes.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Adv. Rajesh Gupta",
      specialization: "Corporate Law",
      availability: false,
      contact: "rajesh.gupta@lawfirm.com",
      phone: "+91-9876543211",
      bio: "Expert in mergers, acquisitions, and corporate compliance.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      name: "Adv. Anjali Verma",
      specialization: "Criminal Law",
      availability: true,
      contact: "anjali.verma@lawfirm.com",
      phone: "+91-9876543212",
      bio: "Specialized in handling criminal defense and justice advocacy.",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      id: 4,
      name: "Adv. Arjun Mehta",
      specialization: "Civil Law",
      availability: true,
      contact: "arjun.mehta@lawfirm.com",
      phone: "+91-9876543213",
      bio: "Focused on property disputes, contract laws, and civil litigation.",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
    },
  ];

  const [advocates, setAdvocates] = useState(defaultAdvocates);
  const [filter, setFilter] = useState("");

  return (
    <div className="advocates-container">
      <h1 className="title">Our Advocates</h1>
      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="search-input"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="advocates-list">
        {advocates
          .filter(
            (advocate) =>
              advocate.name.toLowerCase().includes(filter.toLowerCase()) ||
              advocate.specialization.toLowerCase().includes(filter.toLowerCase())
          )
          .map((advocate) => (
            <div key={advocate.id} className="advocate-card">
              <img
                src={advocate.image}
                alt={advocate.name}
                className="advocate-image"
              />
              <h2>{advocate.name}</h2>
              <p>
                <strong>Specialization:</strong> {advocate.specialization}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                {advocate.availability ? "Available" : "Busy"}
              </p>
              <p className="advocate-bio">{advocate.bio}</p>
              <p>
                <strong>Contact:</strong> {advocate.contact}
              </p>
              <p>
                <strong>Phone:</strong> {advocate.phone}
              </p>
              {/* <button
                className="contact-btn"
                onClick={() => window.open(`mailto:${advocate.contact}`)}
              >
                Contact Advocate
              </button> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Advocates;
