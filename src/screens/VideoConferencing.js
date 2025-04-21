import React, { useState } from 'react';
import '../styles/VideoConferencing.css';

const VideoConferencing = () => {
  const [roomName, setRoomName] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const handleJoin = () => {
    const link = `https://meet.jit.si/${roomName}`;
    setMeetingLink(link);
    window.open(link, '_blank');
  };

  return (
    <div className="video-container">
      <h1 className="title">Video Conferencing</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="input"
        />
        <ul className="join-meeting-list">
          <li onClick={handleJoin}>Join Meeting</li>
        </ul>
      </div>
      {meetingLink && (
        <p className="meeting-link">
          Share this link with others: <a href={meetingLink}>{meetingLink}</a>
        </p>
      )}
    </div>
  );
};

export default VideoConferencing;
