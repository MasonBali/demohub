// components/Table.tsx
import React from "react";
import Row from "./Row";

type TableProps = {
  headers: string[];
  rows: string[][];
  handleClick: (level: any, category: any, headerIndex: any) => void;
};

const Table: React.FC<TableProps> = ({ headers, rows, handleClick }) => (
  <table className="scale-110 rounded-xl shadow-xl border-2 border-zinc-200 border-separate border-spacing-10 bg-zinc-50">
    <thead>
      <tr>
        <th className="w-1/12 text-blue-500 text-xl font-bold"></th>
        {headers.map((header, index) => (
          <th key={index} className="text-slate-500 text-xl font-bold">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <Row key={index} data={row} index={index} handleClick={handleClick} />
      ))}
    </tbody>
  </table>
);

export default Table;
