import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("The frontend app is running");
    fetch("http://localhost:7000/api/getTodos")
      .then((res) => res.json())
      .then((data) => console.log(`Data : ${data.message}`))
      .catch((err) => console.log(`Error : ${err}`));
  }, []);

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
