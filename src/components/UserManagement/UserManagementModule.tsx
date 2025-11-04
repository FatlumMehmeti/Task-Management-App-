import React, { useMemo, useState } from "react";
import MemberList from "./MemberList";
import AddMember from "./AddMember";
import MemberUtils from "./MemberUtils";
import type { Member } from "./MemberItem";
import "./UserManagement.css";

export default function UserManagementModule(): React.ReactElement | null {
  const [open, setOpen] = useState(true);
  const [members, setMembers] = useState<Member[]>(() => {
    // sample members for the prototype
    return [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "admin",
      },
      { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member" },
      {
        id: "3",
        name: "Carol Lee",
        email: "carol@example.com",
        role: "member",
      },
    ];
  });

  const [selected, setSelected] = useState<Member | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const inviteLink = useMemo(
    () => `https://app.example.com/invite/team/abc123`,
    []
  );

  
  function handleInvite(email: string) {
    console.info("Invite requested for:", email);
  }

  function handleCopyLink() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(inviteLink).catch(() => {});
    }
  }

  function handleRemove(id: string) {
    setMembers((s) => s.filter((m) => m.id !== id));
    setSelected(null);
  }

  function handleMakeAdmin(id: string) {
    setMembers((s) =>
      s.map((m) => (m.id === id ? { ...m, role: "admin" } : m))
    );
    setSelected(null);
  }

  function handleRemoveAdmin(id: string) {
    setMembers((s) =>
      s.map((m) => (m.id === id ? { ...m, role: "member" } : m))
    );
    setSelected(null);
  }

  if (!open) return null;

  return (
    <div
      className="um-backdrop"
      role="presentation"
      onClick={() => {
        
        setOpen(false);
        setSelected(null);
        setAnchorRect(null);
      }}
    >
      <div
        className="um-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="um-header">
          <h4 className="um-title">Team members</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="um-count">{members.length}</div>
            <button
              onClick={() => setShowAdd((s) => !s)}
              aria-expanded={showAdd}
              className="um-add-button"
            >
              {showAdd ? "Close" : "Add"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setSelected(null);
                setAnchorRect(null);
              }}
              aria-label="close-user-management"
              className="um-add-button"
              style={{
                background: "#f4f6f8",
                color: "#111",
                boxShadow: "none",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <MemberList
          members={members}
          onOpenUtils={(m, a) => {
            // toggle utils: clicking same member's options closes it
            if (selected && selected.id === m.id) {
              setSelected(null);
              setAnchorRect(null);
            } else {
              setSelected(m);
              setAnchorRect(a ?? null);
            }
          }}
        />

        {showAdd && (
          <AddMember
            inviteLink={inviteLink}
            onInvite={handleInvite}
            onCopyLink={handleCopyLink}
          />
        )}

        {selected && (
          <MemberUtils
            member={selected}
            anchor={anchorRect}
            onClose={() => {
              setSelected(null);
              setAnchorRect(null);
            }}
            onRemove={handleRemove}
            onMakeAdmin={handleMakeAdmin}
            onRemoveAdmin={handleRemoveAdmin}
          />
        )}
      </div>
    </div>
  );
}
