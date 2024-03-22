import Table from "../components/Table";
import config from "../public/config.json";
import Modal from "../components/Modal";
import { useState } from "react";

export default function IndexPage() {
  const headers = Object.keys(config);
  const difficultyLevels = Object.keys(Object.values(config)[0]);
  const rows = difficultyLevels.map((level) =>
    Array(headers.length).fill(level)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [headerCategory, setHeaderCategory] = useState(0);
  const [openGame, setOpenGame] = useState(false);

  const handleClick = (level: any, category: any, headerIndex: any) => {
    console.log(category, level, headerIndex);
    category = headerIndex;
    const question = Object.keys(config[headers[category]][level])[0];
    console.log(question);
    const answer = config[headers[category]][level][question];
    console.log(answer);
    setCurrentQuestion(question);
    setCurrentAnswer(answer);
    setIsAnswered((prevState) => ({ ...prevState, [currentQuestion]: true }));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsAnswered((prevState) => ({ ...prevState, [currentQuestion]: true }));
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`fixed w-1/2 h-full left-0 bg-slate-300 z-50 cursor-pointer
      transform transition-all duration-1000 ease-in-out
      ${openGame ? "-translate-x-full" : "translate-x-0"}
      `}
        onClick={() => {
          setOpenGame(true);
        }}
      ></div>
      <div
        className={`fixed w-1/2 h-full right-0 bg-slate-300 z-50 cursor-pointer
            transform transition-all duration-1000 ease-in-out
            ${openGame ? "translate-x-full" : "translate-x-0"}
      `}
        onClick={() => {
          setOpenGame(true);
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-10 -mt-40">
          PIPELINE QUIZ SHOW 0.1.0{" "}
        </h1>
        <h4 className="font-bold text-center text-blue-500 mb-40">
          ...ok it's not really a show, I had no better title idea
        </h4>

        <Table headers={headers} rows={rows} handleClick={handleClick} />
        {isOpen && (
          <Modal
            question={currentQuestion}
            answer={currentAnswer}
            onClose={() => handleClose()}
          />
        )}
      </div>
    </>
  );
}
