import React, { useState } from "react";
import { Settings } from "lucide-react";
import SettingsDropdown from "./SettingsDropdown";
import "../styles/components.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="navbar">
      <nav className="navbar-nav">
        <h1 className="navbar-title">
          Task<span className="navbar-title-accent"> Managment</span><span className="navbar-title-accent2"> App</span>
        </h1>

        <div className="settings-container">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="settings-button"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          {isOpen && <SettingsDropdown />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
