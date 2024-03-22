// components/Modal.tsx
import React, { useState } from "react";

type ModalProps = {
  question: string;
  answer: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ question, answer, onClose }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg text-center w-96 h-60 z-50 flex flex-col justify-between items-center">
        <h3
          className="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          {question}
        </h3>
        {showAnswer && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">{answer}</p>
          </div>
        )}
        <div className="mt-4">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <div className="fixed bg-gray-500 opacity-75 w-screen h-screen"></div>
    </div>
  );
};

export default Modal;
