import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ProfileEditor from "./ProfileEditor";
import "./SettingsModal.css";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  type ProfileData = { name: string; email: string };
  const [boardLayout, setBoardLayout] = useState<string>(
    localStorage.getItem("boardLayout") || "comfortable"
  );

  useEffect(() => {
    localStorage.setItem("boardLayout", boardLayout);
    document.documentElement.setAttribute("data-board-layout", boardLayout);
  }, [boardLayout]);

  const handleProfileSave = (data: ProfileData) => {
    localStorage.setItem("profile:name", data.name);
    localStorage.setItem("profile:email", data.email);
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-section">
          <h3>Theme</h3>
          <ThemeToggle />
        </div>

        <div className="settings-section">
          <h3>Profile</h3>
          <ProfileEditor onSave={handleProfileSave} />
        </div>

        <div className="settings-section">
          <h3>Board layout</h3>
          <select
            value={boardLayout}
            onChange={(e) => setBoardLayout(e.target.value)}
            className="settings-select"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );
}


