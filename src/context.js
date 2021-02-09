import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchData = async (url) => {
    setWaiting(false);
    setIsLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    console.log(response);
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setIsLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    }
  };

  const openModel = () => {
    setIsModelOpen(true);
  };

  const nextQuestion = (oldIndex) => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModel();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldCorrect) => oldCorrect + 1);
    }
    nextQuestion();
  };

  const startAgain = () => {
    setIsModelOpen(false);
    setCorrect(0);
    setWaiting(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchData(url);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        waiting,
        questions,
        error,
        correct,
        index,
        setIndex,
        isModelOpen,
        setIsModelOpen,
        quiz,
        nextQuestion,
        checkAnswer,
        startAgain,
        handleSubmit,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
