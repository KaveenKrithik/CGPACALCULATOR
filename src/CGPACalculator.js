import React, { useState } from 'react';
import './CGPACalculator.css';

function CGPACalculator() {
  const [subjects, setSubjects] = useState([{ grade: '', credit: '' }]);
  const [cgpa, setCgpa] = useState(null);

  const gradeToPoint = (grade) => ({
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'F': 0
  }[grade] || 0);

  const addSubject = () => setSubjects([...subjects, { grade: '', credit: '' }]);

  const updateSubject = (index, field, value) => {
    const updatedSubjects = subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const calculateCGPA = () => {
    const total = subjects.reduce((acc, { grade, credit }) => {
      const gradePoint = gradeToPoint(grade);
      const parsedCredit = parseFloat(credit);
      return !isNaN(gradePoint) && !isNaN(parsedCredit)
        ? { points: acc.points + gradePoint * parsedCredit, credits: acc.credits + parsedCredit }
        : acc;
    }, { points: 0, credits: 0 });
    setCgpa(total.credits > 0 ? (total.points / total.credits).toFixed(2) : 0);
  };

  return (
    <div className="calculator-container">
      <h1>CGPA Calculator</h1>
      {subjects.map((subject, index) => (
        <div key={index} className="subject-row">
          <input
            type="number"
            placeholder="Credits"
            value={subject.credit}
            onChange={(e) => updateSubject(index, 'credit', e.target.value)}
            className="input-field"
          />
          <select
            value={subject.grade}
            onChange={(e) => updateSubject(index, 'grade', e.target.value)}
            className="input-field select-field"
          >
            <option value="">Grade</option>
            {['O', 'A+', 'A', 'B+', 'B', 'C', 'F'].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={addSubject} className="add-subject-btn">Add Subject</button>
      <button onClick={calculateCGPA} className="calculate-btn">Calculate CGPA</button>
      {cgpa && <h2 className="result">Your CGPA is: {cgpa}</h2>}
    </div>
  );
}

export default CGPACalculator;
