import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  // Add a check to ensure answers is an array before mapping
  const options = Array.isArray(answers) ? answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  )) : [];

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${id}`,
      {method: "DELETE",})
      .then((res) => res.json())
      .then(() => onDeleteQuestion(id))
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value, 10);

    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({correctIndex: newCorrectIndex})
      })
      .then((res) => res.json())
      .then((updatedQuestion) => onUpdateQuestion(updatedQuestion))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
        value={correctIndex}
        onChange={handleCorrectAnswerChange}
        >{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
