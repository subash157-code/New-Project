import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StyleFile/Chatbox.css';

const ChatBox = ({ onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/Questions.json');
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setMessages([{ from: 'bot', text: 'No questions available.' }]);
          return;
        }
        setQuestions(data);
        setMessages([{ from: 'bot', text: data[0] }]);
      } catch (error) {
        console.error('Error loading questions:', error);
        setMessages([{ from: 'bot', text: 'Failed to load questions.' }]);
      }
    };
    fetchQuestions();
  }, []);

  const handleNext = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const currentQuestion = questions[currentQuestionIndex];
    const updatedAnswers = { ...answers, [currentQuestion]: trimmedInput };
    setAnswers(updatedAnswers);

    const updatedMessages = [...messages, { from: 'user', text: trimmedInput }];
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      updatedMessages.push({ from: 'bot', text: questions[nextIndex] });
      setMessages(updatedMessages);
      setCurrentQuestionIndex(nextIndex);
      setInput('');
    } else {
      setMessages(updatedMessages);
      setInput('');
      setAllAnswered(true);
    }
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setMessages((prev) => [...prev, { from: 'bot', text: 'Submitting your answers...' }]);
    try {
      const response = await axios.post('https://new-project-backend-hhl0.onrender.com/submit', answers, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: response.data.message || 'Submitted successfully!' },
      ]);
      setSubmitted(true);
    } catch (error) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error submitting your answers.' }]);
    }
  };

  return (
    <div className="chat-container">
      <button className="chat-cancel-btn" onClick={onClose}>
        Cancel
      </button>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="chat-input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer..."
            className="chat-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!allAnswered) handleNext();
              }
            }}
          />
          {!allAnswered ? (
            <button onClick={handleNext} className="chat-send-btn" disabled={!input.trim()}>
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="chat-send-btn">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
