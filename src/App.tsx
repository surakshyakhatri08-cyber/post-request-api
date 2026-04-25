import { useState } from 'react';
import CounterDisplay from './components/counter-display';
import CounterControls from './components/counter-button';
import TextInput from './components/text-input';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const bgColor =
    count === 10 ? "bg-green-500" :
      count === 5 ? "bg-yellow-400" :
        count === 0 ? "bg-red-500" :
          "bg-gray-100";

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${bgColor}`}>
      <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center">

        <CounterDisplay count={count} text={text} />
      
        <div className="flex flex-col gap-6 items-center">
          <CounterControls count={count} setCount={setCount} />
          <TextInput text={text} setText={setText} />
        </div>

      </div>
    </div>
  );
}

export default App;