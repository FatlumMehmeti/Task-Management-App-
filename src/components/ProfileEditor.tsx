import React, { useState, useEffect } from "react";
import type {  ChangeEvent, FormEvent} from "react";
import profileData from "../data/profileData.json";
import "../styles/components.css";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  desktop: boolean;
}
interface Team {
  id: string;
  name: string;
  role: string;
  members: number;
}
interface Board {
  id: string;
  title: string;
  visibility: "private" | "team" | "public";
  lastActive: string;
}
interface Integrations {
  googleDrive: boolean;
  slack: boolean;
  github: boolean;
}
interface Preferences {
  timezone: string;
  dateFormat: string;
  cardCoverImages: boolean;
  compactMode: boolean;
}
interface Profile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  role: string;
  theme: "light" | "dark";
  language: string;
  notifications: NotificationSettings;
  teams: Team[];
  boards: Board[];
  integrations: Integrations;
  preferences: Preferences;
}

const ProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfile(profileData as Profile);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setProfile((prev) =>
        prev ? { ...prev, [name]: target.checked } : null
      );
    } else {
      setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form"
    >
      <div className="row">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="avatar"
        />
        <div>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input-field"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="input-field"
          />
        </div>
      </div>

      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Your bio..."
        className="input-field textarea"
      />

      <div className="two-col-grid">
        <select
          name="theme"
          value={profile.theme}
          onChange={handleChange}
          className="input-field"
        >
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
        <input
          type="text"
          name="language"
          value={profile.language}
          onChange={handleChange}
          placeholder="Language"
          className="input-field"
        />
      </div>

      <section className="group">
        <h4 className="group-title">Notifications</h4>
        {Object.entries(profile.notifications).map(([key, value]) => (
          <label key={key} className="inline-check">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                setProfile((prev) =>
                  prev
                    ? {
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          [key]: e.target.checked,
                        },
                      }
                    : null
                )
              }
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </section>

      <section>
        <h4 className="group-title">Integrations</h4>
        {Object.entries(profile.integrations).map(([key, value]) => (
          <label key={key} className="inline-check">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                setProfile((prev) =>
                  prev
                    ? {
                        ...prev,
                        integrations: {
                          ...prev.integrations,
                          [key]: e.target.checked,
                        },
                      }
                    : null
                )
              }
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </section>

      <button
        type="submit"
        className="primary-btn"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEditor;
