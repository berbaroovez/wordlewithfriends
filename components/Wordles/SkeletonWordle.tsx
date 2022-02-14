const SkeletonWordle = () => {
  return (
    <div className="bg-white shadow-md rounded-lg px-2 py-3 relative w-64 break-inside ">
      <div className="flex flex-wrap ">
        <div className="w-full">
          <div className="text-xl bg-slate-300 font-bold w-24 h-6 mb-2 rounded"></div>
          <p className="font-medium bg-slate-300 w-8 h-4 mb-2 rounded"></p>
        </div>
      </div>
      <div className="absolute top-3 right-4">
        <p className="text-sm font-medium bg-slate-300 w-6 h-4 rounded"></p>
      </div>

      <div className="mx-auto w-32 h-20 bg-slate-300 rounded"></div>
    </div>
  );
};

export default SkeletonWordle;
