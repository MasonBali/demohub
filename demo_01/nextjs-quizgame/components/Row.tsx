// components/Row.tsx
import React, { useState } from "react";

type RowProps = {
  data: string[];
  index: number;
  handleClick: (level: any, category: any, headerIndex: any) => void;
};

const Row: React.FC<RowProps> = ({ data, index, handleClick }) => {
  const [isClicked, setIsClicked] = useState(Array(data.length).fill(false));

  const handleRowClick = (level: any, category: any, itemIndex: number) => {
    console.log(level, category, itemIndex);
    handleClick(level, category, itemIndex);
    setIsClicked((prevState) =>
      prevState.map((value, index) => (index === itemIndex ? true : value))
    );
  };

  return (
    <>
      <tr>
        <td className="text-blue-500 text-xl font-bold">{(index + 1) * 100}</td>
        {data.map((item, itemIndex, array) => (
          <td
            className={`p-5 rounded-md shadow-md text-slate-800 text-center
            cursor-pointer transition-all duration-300
            hover:scale-110 hover:shadow-lg 
            ${
              isClicked[itemIndex]
                ? "bg-blue-950 text-white hover:bg-blue-950 hover:scale-100 hover:shadow-md"
                : "bg-white"
            }`}
            key={itemIndex}
            onClick={() => handleRowClick(array[0], index, itemIndex)}
          >
            {item}
          </td>
        ))}
      </tr>
    </>
  );
};

export default Row;
