import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Hi This is Lawmake Praveen {count}</div>
      <button onClick={() => setCount(count + 1)} className="button">
        Increase
      </button>
    </>
  );
}

export default App;
