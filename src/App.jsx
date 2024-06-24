import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => {
    return true;
  },
  Active: (task) => {
    return !task.completed;
  },
  Completed: (task) => {
    return task.completed;
  },
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const tasksList = tasks?.filter(FILTER_MAP[filter]).map((task) => {
    return (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );
  });

  const filtersList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton
        key={name}
        name={name}
        isPressed={filter === name}
        setFilter={setFilter}
      />
    );
  });

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks?.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks?.filter((task) => {
      return task.id !== id;
    });
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks?.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      } else {
        return task;
      }
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = tasksList.length !== 1 ? "tasks" : "task";

  const headingText = `${tasksList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filtersList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasksList}
      </ul>
    </div>
  );
}

export default App;
