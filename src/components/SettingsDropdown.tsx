import React, { useState } from "react";
import ProfileEditor from "./ProfileEditor";
import "../styles/components.css";

const SettingsDropdown: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "theme" | "profile">("menu");

  return (
    <div className="settings-dropdown">
      {activeTab === "menu" && (
        <div className="settings-menu">
          <button
            onClick={() => setActiveTab("profile")}
            className="settings-item"
          >
            👤 Edit Profile
          </button>
        </div>
      )}
      {activeTab === "profile" && (
        <div className="settings-panel scroll-area">
          <h3 className="section-title">
            Profile Settings
          </h3>
          <ProfileEditor />
          <button
            onClick={() => setActiveTab("menu")}
            className="back-button"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
