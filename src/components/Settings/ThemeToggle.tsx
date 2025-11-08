import { useEffect, useState } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        <span className="slider" />
      </label>
      <span className="theme-toggle__label">{theme === "dark" ? "Dark" : "Light"}</span>
    </div>
  );
}


