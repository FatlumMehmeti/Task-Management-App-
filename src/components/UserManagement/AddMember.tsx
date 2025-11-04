import React, { useState } from "react";
import "./UserManagement.css";

interface Props {
  onInvite?: (email: string) => void;
  onCopyLink?: () => void;
  inviteLink?: string;
}

export default function AddMember({
  onInvite,
  onCopyLink,
  inviteLink,
}: Props): React.ReactElement {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  function handleInvite() {
    if (!email) return;
    onInvite?.(email);
    setSentTo(email);
    setEmail("");
    setTimeout(() => setSentTo(null), 3000);
  }

  async function handleCopy() {
    if (!inviteLink) return;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(inviteLink);
      }
      setCopied(true);
      onCopyLink?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="um-add">
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
        Invite
      </div>

      <div className="um-invite-row">
        <input
          className="um-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
        <button className="um-invite-btn" onClick={handleInvite}>
          Invite
        </button>
      </div>

      <div>
        <button className="um-copy-link" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy invite link"}
        </button>
      </div>

      {sentTo && (
        <div style={{ fontSize: 12, color: "#2a8f2a", marginTop: 6 }}>
          Invite sent to {sentTo}
        </div>
      )}
    </div>
  );
}
