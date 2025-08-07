import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import './StyleFile/CourseQuiz.css';

const CourseQuiz = () => {
  const [step, setStep] = useState("login");
  const [user, setUser] = useState({ username: "", email: "", mobile: "" });
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/course_quizzes.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleLogin = () => {
    if (user.username && user.email && user.mobile) {
      setStep("selectCourse");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course.course);
    setQuestions(course.questions);
    setStep("quiz");
  };

  const handleAnswer = (selected) => {
    const correct = questions[current].answer;
    if (selected === correct) setScore(score + 1);
    setAnswers({ ...answers, [questions[current].question]: selected });

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    const result = {
      ...user,
      course: selectedCourse,
      answers,
      score,
    };

    try {
    await axios.post("https://new-project-backend-hhl0.onrender.com/userresults", result);
    } catch (error) {
      console.error("Error saving result:", error);
    }

    generatePDF(result);
    setStep("done");
  };

  const generatePDF = (result) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Quiz Result", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${result.username}`, 20, 30);
    doc.text(`Email: ${result.email}`, 20, 40);
    doc.text(`Mobile: ${result.mobile}`, 20, 50);
    doc.text(`Course: ${result.course}`, 20, 60);
    doc.text(`Score: ${result.score}/${questions.length}`, 20, 70);

    let y = 80;
    questions.forEach((q, idx) => {
      doc.text(`${idx + 1}. ${q.question}`, 20, y);
      y += 10;
      doc.text(`Your answer: ${result.answers[q.question]}`, 25, y);
      doc.text(`Correct answer: ${q.answer}`, 120, y);
      y += 10;
    });

    doc.save("quiz_result.pdf");
  };

  return (
   <div className="quiz-container">
  {step === "login" && (
    <>
      <h2 className="quiz-title">Login</h2>
      <input className="quiz-input" placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
      <input className="quiz-input" placeholder="Email" onChange={e => setUser({ ...user, email: e.target.value })} />
      <input className="quiz-input" placeholder="Mobile" onChange={e => setUser({ ...user, mobile: e.target.value })} />
      <button className="quiz-button" onClick={handleLogin}>Continue</button>
    </>
  )}

{step === "selectCourse" && (
  <>
    <h2 className="quiz-title">Select a Course</h2>
    <div className="selectCourse">
    {courses.map((course, i) => (
      <button key={i} className="course-button" onClick={() => handleCourseSelect(course)}>
        {course.course}
      </button>
    ))}
    </div>
  </>
)}

  {step === "quiz" && (
    <>
      <div className="quiz-question">
        Q{current + 1}. {questions[current].question}
      </div>
      {questions[current].options.map((opt, i) => (
        <button key={i} className="option-button" onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </>
  )}

  {step === "done" && (
    <>
      <div className="quiz-finished">Quiz Finished 🎉</div>
      <p className="quiz-note">Your result is saved and a PDF has been downloaded.</p>
    </>
  )}
</div>
  );
};

export default CourseQuiz;
