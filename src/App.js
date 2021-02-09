import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    isLoading,
    waiting,
    questions,
    correct,
    index,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }
  if (waiting) {
    return <SetupForm />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className={"quiz"}>
        <div>
          <h4 className={"correct-answers"}>
            correct answer {correct}/{index}
          </h4>
        </div>
        <article className={"btn-container"}>
          <h1 dangerouslySetInnerHTML={{ __html: question }} />
          <div className={"btn-container"}>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className={"next-question"} onClick={nextQuestion}>
          Skip Question
        </button>
      </section>
    </main>
  );
}

export default App;
