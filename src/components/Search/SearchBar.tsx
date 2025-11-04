import { useState } from "react";
import "./SearchBar.css";

const dummyTasks = [
  { id: 1, title: "Fix Navbar bug", assignee: "Olivia Smith" },
  { id: 2, title: "Add Login page", assignee: "James Miller" },
  { id: 3, title: "Design Dashboard layout", assignee: "Sophia Johnson" },
  { id: 4, title: "Implement Search feature", assignee: "Liam Brown" },
  { id: 5, title: "Polish UI colors", assignee: "Emma Davis" },
  { id: 6, title: "Optimize data fetching", assignee: "Noah Wilson" },
  { id: 7, title: "Fix mobile responsiveness", assignee: "Ava Taylor" },
  { id: 8, title: "Update README documentation", assignee: "William Clark" },
  { id: 9, title: "Add task sorting functionality", assignee: "Mia Lewis" },
  { id: 10, title: "Test new UI components", assignee: "Ethan Walker" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(dummyTasks);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = dummyTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.assignee.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks or assignee..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />

      {/*  */}
      {query && (
        <ul className="search-results">
          {results.map((task) => (
            <li key={task.id}>
              <span className="task-title">{task.title}</span>
              <span className="assignee">
                <span className="user-icon">👤</span>
                {task.assignee}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
