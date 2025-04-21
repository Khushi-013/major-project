import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [prompt, setPrompt] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([
    { question: "What is this platform about?", answer: "This is an AI chatbot platform to assist users." },
    { question: "How can I contact support?", answer: "You can contact support via the 'Contact Us' page." },
    { question: "What features does this platform have?", answer: "It includes chat assistance, query resolution, and more." },
  ]);

  const messageContainerRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { question: prompt, answer: "Thank you for your query! We'll get back to you soon." },
    ]);
    setPrompt("");
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const filteredMessages = messages.filter((msg) =>
    msg.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center px-4 py-8">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-12 items-center">
          {/* About Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">About Us</h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              Welcome to our platform! We integrate cutting-edge technology with user-centric design to deliver an exceptional experience. Explore and interact with our chatbot to learn more.
            </p>
          </div>

          {/* Chatbot Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
              Chat with Us
            </h2>

            {/* Search Bar */}
            <div className="mb-4 w-3/4">
              <input
                type="text"
                placeholder="Search previous queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Chat History */}
            <div
              className="h-[250px] w-3/4 overflow-y-auto bg-gray-100 rounded-lg p-4 border border-gray-300 thin-scrollbar"
              ref={messageContainerRef}
            >
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, i) => (
                  <div key={i} className="mb-6">
                    {/* User Message */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="bg-blue-600 p-3 rounded-full text-white text-xl">
                        <CgProfile />
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg text-gray-800 flex-1">
                        {msg.question}
                      </div>
                    </div>
                    {/* Bot Response */}
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-500 p-3 rounded-full text-white text-xl">
                        <FaRobot />
                      </div>
                      <div className="bg-white p-3 rounded-lg text-gray-800 flex-1 border border-gray-300">
                        {msg.answer}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No matching queries found.</p>
              )}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={submitHandler}
              className="flex justify-center items-center space-x-2 mt-4 w-3/4"
            >
              <input
                type="text"
                placeholder="Ask something..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className="w-2/3 p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 outline-none transition-all"
              />
              {/* <button
                type="submit"
                className="p-2 bg-blue-600 rounded-lg text-white text-lg hover:bg-blue-700 transition-all"
              >
                <IoMdSend />
              </button> */}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
