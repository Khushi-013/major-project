// src/components/AdvocateModal.js
import React from 'react';
import '../styles/AdvocateModal.css';

const AdvocateModal = ({ advocate, onClose }) => {
  if (!advocate) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>{advocate.name}</h3>
        <p><strong>Specialization:</strong> {advocate.specialization}</p>
        <p><strong>Email:</strong> {advocate.email}</p>
        <p><strong>Phone:</strong> {advocate.phone}</p>

        <ul className="modal-action-list">
          <li>
            <a href={`mailto:${advocate.email}`}>📧 Send Email</a>
          </li>
          <li>
            <a href={`tel:${advocate.phone}`}>📞 Call Now</a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Chat feature coming soon!'); }}>
              💬 Chat
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Launching video conferencing...'); }}>
              📹 Video Conference
            </a>
          </li>
          <li>
            <a href={advocate.linkedin || '#'} target="_blank" rel="noopener noreferrer">
              💼 View LinkedIn
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Document sharing coming soon!'); }}>
              📁 Share Documents
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Redirecting to scheduler...'); }}>
              📅 Schedule Meeting
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvocateModal;
