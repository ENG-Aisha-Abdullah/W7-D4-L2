import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [all, setAll] = useState([]);
  // const [search, setSearch] = useState("");

  const url = "https://6836b805664e72d28e41cf24.mockapi.io/toDoList";

  useEffect(() => {
    axios.get(url).then((res) => setAll(res.data));
  }, []);

  const addTask = () => {
    axios.post(url, { text: task }).then((res) => {
      setAll([...all, res.data]);
      setTask("");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${url}/${id}`).then(() => {
      setAll(all.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="h-screen bg-gray-100 p-6 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold">To DO LIST</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="ADD LIST"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className=" rounded  p-2 border border-gray-500"
        />
        <button
          onClick={addTask}
          className="rounded bg-amber-200 text-gray-800 px-10 py-2"
        >
          ADD
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
        {all.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <h1>{item.text}</h1>
            <button
              onClick={() => deleteTask(item.id)}
              className="bg-red-800 text-white px-3 py-1 rounded"
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
