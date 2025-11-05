import { useState } from "react";
import "./ProfileEditor.css";

export type ProfileData = {
  name: string;
  email: string;
};

type ProfileEditorProps = {
  onSave: (data: ProfileData) => void;
};

export default function ProfileEditor({ onSave }: ProfileEditorProps) {
  const [name, setName] = useState<string>(
    localStorage.getItem("profile:name") || ""
  );
  const [email, setEmail] = useState<string>(
    localStorage.getItem("profile:email") || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email });
  };

  return (
    <form className="profile-editor" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="profile-editor__actions">
        <button type="submit" className="save-btn">Save</button>
      </div>
    </form>
  );
}


