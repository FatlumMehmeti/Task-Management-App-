import React, { useEffect, useState } from "react";
import profileData from "../data/profileData.json";
import "../styles/components.css";

type ColumnId = "todo" | "inprogress" | "done";

type Task = {
  id: string;
  title: string;
  description?: string;
  column: ColumnId;
  assignee?: string;
  createdAt: string;
};

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const STORAGE_KEY = "task_module.tasks.v1";

const makeId = (prefix = "t") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const TaskModule: React.FC = () => {
  // Load initial tasks from localStorage or create a small demo set
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Task[];
    } catch {
      // ignore
    }

    const userName = (profileData as { name?: string }).name ?? "Me";
    return [
      {
        id: makeId(),
        title: "Create wireframes for landing page",
        description: "First pass for hero + features",
        column: "todo",
        assignee: userName,
        createdAt: new Date().toISOString(),
      },
      {
        id: makeId(),
        title: "API: tasks endpoint",
        description: "Define routes and schema",
        column: "inprogress",
        assignee: userName,
        createdAt: new Date().toISOString(),
      },
      {
        id: makeId(),
        title: "Release v0.1",
        description: "Minor fixes and changelog",
        column: "done",
        assignee: userName,
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Persist tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const addTask = (column: ColumnId, title: string) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: makeId(),
      title: title.trim(),
      column,
      assignee: (profileData as { name?: string }).name ?? "Me",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const moveTask = (taskId: string, to: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: to } : t))
    );
  };

  // Delete a task by id
  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Drag & drop handlers
  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDropToColumn = (e: React.DragEvent, to: ColumnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) moveTask(id, to);
  };

  // local form state for new tasks per column
  const [newTitles, setNewTitles] = useState<Record<ColumnId, string>>({
    todo: "",
    inprogress: "",
    done: "",
  });

  return (
    <section className="task-module" style={{ padding: 16 }}>
      <h2 className="section-title">Board</h2>

      <div
        className="columns"
        style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
      >
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="column"
            onDragOver={onDragOver}
            onDrop={(e) => onDropToColumn(e, col.id)}
            style={{
              flex: 1,
              minWidth: 220,
              background: "var(--panel)",
              border: "1px solid var(--panel-border)",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div
              className="column-header"
              style={{
                marginBottom: 8,
                display: "flex",
                gap: 8,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <strong>{col.title}</strong>
              <span style={{ color: "var(--muted)", fontSize: 12 }}>
                {tasks.filter((t) => t.column === col.id).length}
              </span>
            </div>

            <form
              className="add-task-form"
              onSubmit={(e) => {
                e.preventDefault();
                addTask(col.id, newTitles[col.id]);
                setNewTitles((s) => ({ ...s, [col.id]: "" }));
              }}
              style={{ marginBottom: 8 }}
            >
              <input
                className="input-field"
                value={newTitles[col.id]}
                placeholder={`Add a card to ${col.title}`}
                onChange={(e) =>
                  setNewTitles((s) => ({ ...s, [col.id]: e.target.value }))
                }
                style={{ width: "100%", padding: "8px", marginBottom: 6 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="submit"
                  className="primary-btn"
                  style={{ padding: "6px 10px" }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setNewTitles((s) => ({ ...s, [col.id]: "" }))}
                  className="settings-button"
                  style={{ padding: "6px 10px" }}
                >
                  Clear
                </button>
              </div>
            </form>

            <div
              className="column-cards scroll-area"
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {tasks
                .filter((t) => t.column === col.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="task-card"
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: 10,
                      boxShadow: "var(--panel-shadow)",
                      cursor: "grab",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{task.title}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {task.description && (
                      <div
                        style={{
                          marginTop: 6,
                          color: "var(--muted)",
                          fontSize: 13,
                        }}
                      >
                        {task.description}
                      </div>
                    )}
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        {task.assignee}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {task.column !== "todo" && (
                          <button
                            className="settings-button"
                            onClick={() => moveTask(task.id, "todo")}
                            title="Move to To Do"
                            style={{color:"white"}}
                          >
                            To Do
                          </button>
                        )}
                        {task.column !== "inprogress" && (
                          <button
                            className="settings-button"
                            onClick={() => moveTask(task.id, "inprogress")}
                            title="Move to In Progress"
                            style={{color:"orange"}}
                          >
                            In Progress
                          </button>
                        )}
                        {task.column !== "done" && (
                          <button
                            className="settings-button"
                            onClick={() => moveTask(task.id, "done")}
                            title="Move to Done"
                            style={{ color: "green" }}
                          >
                            Done
                          </button>
                        )}
                        {/* Delete button — removes the card completely */}
                        <button
                          className="settings-button"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                          style={{ color: "#dc2626" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskModule;
