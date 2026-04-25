import type React from "react";

const CounterControls = ({ count, setCount }: { count: number, setCount: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex gap-6 justify-center items-center">

        {count > 0 ? (
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className="px-8 py-3 bg-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-200 transition-all active:scale-90"
          >
            - Decrement
          </button>
        ) : (
          <span className="text-red-600 font-bold">Min Reached!</span>
        )}

        {count < 10 ? (
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-90 shadow-lg"
          >
            + Increment
          </button>
        ) : (
          <span className="text-green-600 font-bold">Max Reached!</span>
        )}
      </div>

      {count > 0 && (
        <button
          onClick={() => setCount(0)}
          className="px-10 py-2 border-2 border-gray-200 text-gray-500 rounded-xl font-medium hover:bg-gray-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 shadow-sm"
        >
          Reset Counter
        </button>
      )}
    </div>
  );
};

export default CounterControls;