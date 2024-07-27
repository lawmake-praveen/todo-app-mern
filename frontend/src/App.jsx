import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState("");
  const [form, setForm] = useState({
    title: "",
    desc: "",
    completed: false,
  });

  useEffect(() => {
    const getTodos = async () => {
      console.log("The frontend app is running");
      fetch("http://localhost:7000/api/getTodos")
        .then((res) => res.json())
        .then((data) => setCount(data.message))
        .catch((err) => console.log(`Error : ${err}`));
    };
    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var todo = {
      title: form.title,
      description: form.desc,
      completed: form.completed,
      createdDate: new Date().toLocaleString(),
      updatedDate: "2024-07-26T10:15:30.000Z",
      authorId: 1,
    };

    console.log(`Getting clicked ${JSON.stringify(todo)}`);

    await fetch("http://localhost:7000/api/createTodo", {
      method: "POST",
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`${JSON.stringify(data)}`);
        setCount(data.title);
      })
      .catch((err) => console.log(`Error : ${err}`));
  };

  return (
    <>
      <div>Hi This is Lawmake Praveen {count}</div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="text-box">
          <label htmlFor="">Title: </label>
          <input
            type="text"
            id=""
            required
            value={form.title}
            onChange={(e) =>
              setForm((prevForm) => ({ ...prevForm, title: e.target.value }))
            }
          />
        </div>
        <div className="text-box">
          <label htmlFor="">Description: </label>
          <input
            type="text"
            id=""
            required
            value={form.desc}
            onChange={(e) =>
              setForm((prevForm) => ({ ...prevForm, desc: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="">Completed</label>
          <input
            type="checkbox"
            value={form.completed}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                completed: e.target.checked,
              }))
            }
          />
        </div>
        <input type="submit" value="Submit" />
      </form>

      <div>
        {form.title}
        <br />
        {form.desc}
        <br />
        {form.completed ? "Completed" : "Pending"}
      </div>
      <button onClick={() => setCount(count + 1)} className="button">
        Increase
      </button>
    </>
  );
}

export default App;
