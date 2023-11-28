import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setQuestions(data);
    })
  }, [])


  function sendQuestionsBack (newQuestions) {
    setQuestions(newQuestions)
  }


  function onQuestionDelete(questionId) {
    const filterQuestions = questions.filter(
      (question) => question.id != questionId
    )
    setQuestions(filterQuestions);
  }

  console.log(questions)

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} sendQuestionsBack={sendQuestionsBack} /> : <QuestionList questions={questions} onQuestionDelete={onQuestionDelete} />}
    </main>
  );
}

export default App;
