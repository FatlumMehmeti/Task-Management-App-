import React, { useMemo, useState } from "react";
import MemberList from "./MemberList";
import AddMember from "./AddMember";
import MemberUtils from "./MemberUtils";
import type { Member } from "./MemberItem";
import "./UserManagement.css";
import {UserRound} from "lucide-react"
interface Props {
  open?: boolean;
  onClose?: () => void;
}

export default function UserManagementModule({
  open: openProp,
  onClose,
}: Props = {}): React.ReactElement | null {
  const [internalOpen, setInternalOpen] = useState(false);

  const [members, setMembers] = useState<Member[]>(() => [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
    },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "member" },
    { id: "3", name: "Carol Lee", email: "carol@example.com", role: "member" },
  ]);

  const [selected, setSelected] = useState<Member | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const inviteLink = useMemo(
    () => `https://app.example.com/invite/team/abc123`,
    []
  );

  // Invite sends an invite but does not immediately add the member to the team
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

  const isControlled = typeof openProp === "boolean";
  const isOpen = isControlled ? !!openProp : internalOpen;

  function doClose() {
    setSelected(null);
    setAnchorRect(null);
    setShowAdd(false);
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
    }
  }

  const modal = (
    <div className="um-backdrop" role="presentation" onClick={doClose}>
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
              onClick={doClose}
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

  if (isControlled) {
    if (!isOpen) return null;
    return modal;
  }

  // uncontrolled: render a trigger button and the modal when internalOpen is true
  return (
    <>
      <button
        className="userM-button navbar-right-button"
        onClick={() => setInternalOpen((s) => !s)}
        aria-expanded={internalOpen}
      >
        <UserRound size={24} strokeWidth={2} />
      </button>
      {internalOpen && modal}
    </>
  );
}
