import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState("");
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    completed: false,
  });

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    console.log("The frontend app is running");
    fetch("http://localhost:7000/api/getTodos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(`Error : ${err}`));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var todo = {
      title: form.title,
      description: form.desc,
      completed: form.completed,
      authorId: Math.ceil(Math.random()),
    };

    console.log(`Getting clicked ${JSON.stringify(todo)}`);

    await fetch("http://localhost:7000/api/createTodo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`${JSON.stringify(data)}`);
        // setCount(data.title);
      })
      .catch((err) => console.log(`Error : ${err}`));
    await getTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:7000/api/deleteTodo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(`Data : ${JSON.stringify(data.todo)}`))
      .catch((err) => console.log(`Could not delete todo : ${err}`));
    await getTodos();
  };

  const handleUpdate = async (id) => {
    const todo = {
      title: form.title,
      description: form.desc,
      completed: form.completed,
      updatedAt: Date.now(),
    };
    console.log(`sent payload : ${JSON.stringify(todo)}`);
    await fetch(`http://localhost:7000/api/updateTodo/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(`data : ${JSON.stringify(data)}`));
    await getTodos();
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

      <div className="todo-container">
        {todos.map((todo, index) => {
          return (
            <div className="todo" key={index}>
              <div>
                <p>{todo.title}</p>{" "}
                <input
                  type="button"
                  value="Delete"
                  onClick={() => handleDelete(todo.id)}
                />
                <input
                  type="button"
                  value="Update"
                  onClick={() => handleUpdate(todo.id)}
                />
              </div>
              <p>{todo.description}</p>
              <p>{todo.completed ? "Completed" : "Pending"}</p>
            </div>
          );
        })}
      </div>
      <button onClick={() => setCount(count + 1)} className="button">
        Increase
      </button>
    </>
  );
}

export default App;
