import { useCallback, useEffect, useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Record<string, Task>>({});
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle) {
      setTasks({
        ...tasks,
        [Date.now()]: {
          id: Date.now(),
          title: newTaskTitle,
          isComplete: false,
        },
      });
    }
  }

  const handleToggleTaskCompletion = useCallback(
    (idParam: number) => {
      tasks[idParam].isComplete = !tasks[idParam].isComplete;
      setTasks({ ...tasks });
    },
    [tasks]
  );

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {Object.values(tasks).map(({ id, title, isComplete }: Task) => (
            <li key={id}>
              <div className={isComplete ? "completed" : ""} data-testid="task">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={isComplete}
                    onClick={() => handleToggleTaskCompletion(id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>
                  {title}
                  {isComplete}
                </p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
