interface StatBoxProp {
  title: string;
  stat: string | number;
}

const StatBox = ({ title, stat }: StatBoxProp) => {
  return (
    <div className="h-32  bg-white rounded p-4 relative shadow-md w-64 sm:w-auto">
      <div className="text-l font-bold uppercase text-center">{title}</div>
      <div className="grid justify-center content-center h-5/6 font-medium text-slate-400">
        {stat}
      </div>
    </div>
  );
};

export default StatBox;
