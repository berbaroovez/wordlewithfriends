interface StatLineProps {
  stat: string;
  leftValue: number | string;
  rightValue: number | string;
}

const StatLine = ({ stat, leftValue, rightValue }: StatLineProps) => {
  return (
    <div className="grid grid-flow-col  ">
      <div className=" w-8 text-right">{leftValue}</div>
      <div className="w-64 text-center font-bold ">{stat}</div>

      <div className=" w-8 text-left">{rightValue}</div>
    </div>
  );
};

export default StatLine;
