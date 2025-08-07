import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./StyleFile/ClassDashboard.css";


const ClassDashboard = () => {
  const { state } = useLocation();
  const user = state?.user;

  const [selectedDay, setSelectedDay] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    fetch("/Question.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);

  if (!user) return <h2>Unauthorized access</h2>;

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setUserAnswer("");
  };

  const handleAnswerSubmit = async () => {
    const correctAnswer = questions[selectedDay]?.answer;

    if (userAnswer === correctAnswer) {
      alert("✅ Correct Answer!");
      setCompletedDays((prev) => [...prev, selectedDay]);
      setSelectedDay(null);

      try {
        await fetch("https://new-project-backend-hhl0.onrender.com/api/logininfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            day: selectedDay,
            answer: userAnswer,
            date: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("❌ Failed to save answer info:", error);
      }
    } else {
      alert("❌ Incorrect! Please try again.");
    }
  };

  const isAssessmentUnlocked = completedDays.length === 30;

  return (
    <div className="dashboard-container">
      <h1>🎓 Welcome, {user.name}!</h1>

      <div className="user-summary">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Course:</strong> {user.courseTitle}</p>
        <p><strong>Period:</strong> 30 Days</p>
      </div>

      <h2 className="section-title">📅 30-Day Session Tracker</h2>
      <div className="session-grid">
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const isCompleted = completedDays.includes(day);
          return (
            <div
              key={i}
              className={`session-box ${isCompleted ? "completed" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              Day {day}
            </div>
          );
        })}
      </div>

      {/* Video Section */}
      {questions[selectedDay]?.video && (
        <div className="video-container">
          <iframe
            width="80%"
            height="100%"
            src={questions[selectedDay].video}
            title="Session Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Session Details & Quiz */}
      {selectedDay && questions[selectedDay] && (
        <div className="session-details">
          <h3>📖 Session for Day {selectedDay}</h3>
          <p><strong>Q:</strong> {questions[selectedDay].question}</p>

          <div className="quiz-options">
            {questions[selectedDay].options.map((opt, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name="answer"
                  value={opt}
                  checked={userAnswer === opt}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>

          <button onClick={handleAnswerSubmit}>✅ Submit Answer</button>
        </div>
      )}

      {/* Final Assessment */}
      <h2 className="section-title">📝 Final Assessment</h2>
      <div className="assessment-box">
        {isAssessmentUnlocked ? (
          <p>🎉 Assessment is unlocked! You may now proceed to take your final test.</p>
        ) : (
          <p>🔒 Complete all 30 sessions to unlock the final assessment.</p>
        )}
      </div>
    </div>
  );
};

export default ClassDashboard;
