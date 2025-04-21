import React, { useState } from 'react';
import '../../styles/ClientDashboard.css';
import Advocates from '../../screens/Advocates';
import VideoConferencing from '../../screens/VideoConferencing';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AdvocateModal from '../AdvocateModal';

const qaData = [
  {
    question: "What is IPC Section 302?",
    answer: "IPC Section 302 deals with punishment for murder. Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine."
  },
  {
    question: "Explain IPC 302",
    answer: "IPC 302 is the section for murder. It prescribes the death penalty or life imprisonment for the offender."
  },
  {
    question: "What is the punishment under IPC 376?",
    answer: "IPC Section 376 covers punishment for rape. The punishment may extend from 10 years to life imprisonment, and also includes a fine."
  },
  {
    question: "Explain IPC Section 376 rape law",
    answer: "IPC 376 deals with rape and provides for rigorous punishment ranging from 10 years to life, along with a fine."
  },
  {
    question: "What does IPC 420 mean?",
    answer: "IPC Section 420 relates to cheating and dishonestly inducing delivery of property. The punishment is up to 7 years and a fine."
  },
  {
    question: "What is Section 420 case in India?",
    answer: "Section 420 of IPC involves cheating, fraud or dishonest inducement of property delivery. It carries up to 7 years of imprisonment and fine."
  },
  {
    question: "What is IPC 498A?",
    answer: "IPC Section 498A deals with cruelty by husband or his relatives. It protects married women from abuse and harassment."
  },
  {
    question: "What is the punishment for domestic violence under IPC?",
    answer: "IPC 498A is used in cases of domestic violence and cruelty. It allows imprisonment of up to 3 years and also includes a fine."
  },
  {
    question: "Which IPC section deals with suicide?",
    answer: "IPC Section 309 deals with attempt to commit suicide. It states that whoever attempts suicide shall be punished with simple imprisonment up to one year or with fine."
  },
  {
    question: "Is attempting suicide illegal in India?",
    answer: "Yes, under IPC 309, attempting suicide is considered an offense punishable by imprisonment up to 1 year or fine."
  },
  {
    question: "What is IPC Section 144?",
    answer: "Section 144 of the CrPC empowers authorities to issue orders in urgent cases of nuisance or apprehended danger, prohibiting assembly of four or more people."
  },
  {
    question: "What happens during Section 144 imposition?",
    answer: "During imposition of IPC Section 144, public gatherings of four or more people are prohibited to avoid unrest or violence."
  },
  {
    question: "What is the IPC for defamation?",
    answer: "IPC Section 499 defines defamation and Section 500 prescribes punishment for the same—up to 2 years of imprisonment, or fine, or both."
  },
  {
    question: "What section covers defamation in IPC?",
    answer: "Defamation is covered under IPC 499 and 500. False or harmful statements damaging a person’s reputation can be punished by up to 2 years in prison or fine."
  },
  {
    question: "What is IPC Section 354?",
    answer: "IPC 354 deals with assault or criminal force to woman with intent to outrage her modesty."
  },
  {
    question: "Which law deals with molestation of women?",
    answer: "IPC Section 354 is used to deal with acts intended to outrage the modesty of a woman, including molestation."
  },
  {
    question: "Which section of IPC is about kidnapping?",
    answer: "IPC Section 363 deals with punishment for kidnapping."
  },
  {
    question: "What is the IPC for abduction or kidnapping?",
    answer: "IPC 363 provides punishment for kidnapping any person from lawful guardianship, which may extend to 7 years and fine."
  },
  {
    question: "What is IPC Section 307?",
    answer: "IPC Section 307 refers to attempt to murder. The punishment may extend to life imprisonment."
  },
  {
    question: "What happens in an IPC 307 case?",
    answer: "Under IPC 307, if someone is found guilty of attempting to murder another, they can face up to life imprisonment."
  },
  {
    question: "Which section of IPC deals with theft?",
    answer: "IPC Section 378 defines theft, and Section 379 provides punishment for theft, which may extend to 3 years of imprisonment or fine or both."
  },
  {
    question: "What is IPC Section 406?",
    answer: "IPC 406 deals with criminal breach of trust. The punishment can be up to 3 years or fine or both."
  },
  {
    question: "What is Section 34 in IPC?",
    answer: "Section 34 of IPC refers to acts done by several persons in furtherance of common intention. Each person is equally liable for the act."
  },
  {
    question: "What is IPC 375?",
    answer: "IPC Section 375 defines rape and explains the acts that constitute the crime."
  },
  {
    question: "Which section is applied in cyber crime cases?",
    answer: "Cyber crimes are mostly covered under the IT Act, but IPC Sections 419, 420, 463, 464, 465, and 468 are also used in cases like identity theft, forgery, and cheating online."
  }
];
const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hearingDetails, setHearingDetails] = useState({});
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);

  const handleHearingClick = () => {
    setHearingDetails({
      venue: 'Mumbai High Court, Room 402',
      timing: '11:00 AM - 1:00 PM',
      necessities: 'Bring all evidence and ID proof. Wear formal attire.'
    });
    setShowModal(true);
  };

  const handleChatSubmit = async () => {
    if (!chatQuery.trim()) {
      setChatResponse("Please ask something about IPC sections.");
      return;
    }

    const lowerQuery = chatQuery.toLowerCase();
    const matched = qaData.find(item =>
      lowerQuery.includes(item.question.toLowerCase()) ||
      item.question.toLowerCase().includes(lowerQuery)
    );

    if (matched) {
      setChatResponse(matched.answer);
    } else {
      setChatResponse("Thinking... 🤔");

      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer sk-proj-xxx` // Replace securely
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'user', content: `Answer this legal question in a helpful and simple way: ${chatQuery}` }
            ],
            max_tokens: 500,
            temperature: 0.5
          })
        });

        const data = await res.json();
        if (data?.choices?.[0]?.message?.content) {
          setChatResponse(data.choices[0].message.content.trim());
        } else {
          setChatResponse("Sorry, couldn't generate a response. Try again.");
        }
      } catch (err) {
        console.error(err);
        setChatResponse("Failed to fetch answer from AI.");
      }
    }
  };

  const renderStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return <FaHourglassHalf title="In Progress" className="status-icon in-progress" />;
      case 'completed':
        return <FaCheckCircle title="Completed" className="status-icon completed" />;
      case 'closed':
        return <FaTimesCircle title="Closed" className="status-icon closed" />;
      default:
        return null;
    }
  };

  const filteredQA = qaData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'cases':
        return (
          <div className="tab-content">
            <h2>My Active Cases</h2>
            <table className="my-cases-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Advocate Name</th>
                  <th>Next Hearing</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>00123</td>
                  <td
                    className="clickable-hearing"
                    onClick={() => setSelectedAdvocate({
                      name: 'Adv. John Doe',
                      specialization: 'Criminal Law',
                      email: 'john.doe@lawmail.com',
                      phone: '+91-9876543210',
                      videoCall: () => alert('Starting video call with John Doe...')
                    })}
                  >
                    Adv. John Doe
                  </td>
                  <td className="clickable-hearing" onClick={handleHearingClick}>2024-09-25</td>
                  <td>{renderStatusIcon("In Progress")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case 'advocates':
        return <Advocates />;

      case 'video':
        return <VideoConferencing />;

      case 'chatbot':
        return (
          <div className="chatbot-section">
            <h2>IPC HelpBot</h2>

            <div className="chatbot">
              <textarea
                placeholder="Ask anything about IPC sections..."
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
              ></textarea>
              <ul className="submit-list">
                <li onClick={handleChatSubmit}>Submit</li>
              </ul>

              {chatResponse && (
                <div className="chat-response">
                  <strong>Response:</strong>
                  <p>{chatResponse}</p>
                </div>
              )}

              <div className="accordion-search">
                <h4>Search IPC FAQs:</h4>
                <input
                  type="text"
                  placeholder="Search by question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="accordion-search-box"
                />

                <div className="accordion-container">
                  {filteredQA.map((item, index) => (
                    <details key={index} className="accordion-item">
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="client-dashboard">
      <div className="dashboard-tabs-nav">
        <nav>
          <ul className="tabs-list">
            <li onClick={() => setActiveTab('cases')} className={activeTab === 'cases' ? 'active' : ''}>My Cases</li>
            <li onClick={() => setActiveTab('advocates')} className={activeTab === 'advocates' ? 'active' : ''}>Find Advocates</li>
            <li onClick={() => setActiveTab('video')} className={activeTab === 'video' ? 'active' : ''}>Video Conferencing</li>
            <li onClick={() => setActiveTab('chatbot')} className={activeTab === 'chatbot' ? 'active' : ''}>IPC Chatbot</li>
          </ul>
        </nav>
      </div>

      <div className="dashboard-content">{renderContent()}</div>

      {showModal && (
        <div className="hearing-modal">
          <h3>Next Hearing Details</h3>
          <p><strong>Venue:</strong> {hearingDetails.venue}</p>
          <p><strong>Timing:</strong> {hearingDetails.timing}</p>
          <p><strong>Instructions:</strong> {hearingDetails.necessities}</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}

      {selectedAdvocate && (
        <AdvocateModal advocate={selectedAdvocate} onClose={() => setSelectedAdvocate(null)} />
      )}
    </div>
  );
};

export default ClientDashboard;
