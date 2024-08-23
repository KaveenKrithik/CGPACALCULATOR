
import React, { useState } from 'react';
import './CGPACalculator.css';

function CGPACalculator() {
  const [subjects, setSubjects] = useState([{ grade: '', credit: '' }]);
  const [cgpa, setCgpa] = useState(null);

  const gradeToPoint = (grade) => {
    switch (grade) {
      case 'O': return 10;
      case 'A+': return 9;
      case 'A': return 8;
      case 'B+': return 7;
      case 'B': return 6;
      case 'C': return 5;
      case 'F': return 0;
      default: return 0;
    }
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: '', credit: '' }]);
  };

  const handleGradeChange = (index, event) => {
    const newSubjects = [...subjects];
    newSubjects[index].grade = event.target.value;
    setSubjects(newSubjects);
  };

  const handleCreditChange = (index, event) => {
    const newSubjects = [...subjects];
    newSubjects[index].credit = event.target.value;
    setSubjects(newSubjects);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
      const gradePoint = gradeToPoint(subject.grade);
      const credit = parseFloat(subject.credit);

      if (!isNaN(gradePoint) && !isNaN(credit)) {
        totalPoints += gradePoint * credit;
        totalCredits += credit;
      }
    });

    const calculatedCGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    setCgpa(calculatedCGPA);
  };

  return (
    <div className="calculator-container">
      <h1>CGPA CALCULATOR</h1>
   


      {subjects.map((subject, index) => (
        <div key={index} className="subject-row">
          <input
            type="number"
            placeholder="Credits"
            value={subject.credit}
            onChange={event => handleCreditChange(index, event)}
            className="input-field"
          />
          <select
            value={subject.grade}
            onChange={event => handleGradeChange(index, event)}
            className="input-field select-field"
          >
            <option value="">Grade</option>
            <option value="O">O</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="F">F</option>
          </select>
        </div>
      ))}
      <button onClick={addSubject} className="add-subject-btn">Add Subject</button>
      <button onClick={calculateCGPA} className="calculate-btn">Calculate CGPA</button>
      {cgpa !== null && <h2 className="result">Your CGPA is: {cgpa}</h2>}
    </div>
  );
}

export default CGPACalculator;
