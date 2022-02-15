interface TableProps {
  title: string;
  children: React.ReactNode;
}

const Table = ({ title, children }: TableProps) => {
  return (
    <table className="shadow-lg bg-white rounded-lg w-96 self-start ">
      <thead className="">
        <tr className="bg-slate-800 text-white ">
          <th className="text-left px-8 py-4  rounded-tl-lg">Name</th>
          <th className="text-left px-8 py-4   rounded-tr-lg">{title}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
