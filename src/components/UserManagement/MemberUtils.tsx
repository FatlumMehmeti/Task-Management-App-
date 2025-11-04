import React, { useEffect, useRef } from "react";
import type { Member } from "./MemberItem";
import "./UserManagement.css";

interface Props {
  member: Member;
  anchor?: DOMRect | null;
  onClose: () => void;
  onRemove: (id: string) => void;
  onMakeAdmin: (id: string) => void;
  onRemoveAdmin?: (id: string) => void;
}

export default function MemberUtils({
  member,
  anchor,
  onClose,
  onRemove,
  onMakeAdmin,
  onRemoveAdmin,
}: Props): React.ReactElement {
  const style: React.CSSProperties = {};
  const WIDTH = 220;

  if (anchor && typeof window !== "undefined") {
    let left = anchor.left;
    const top = anchor.bottom + 8;
    if (left + WIDTH > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - WIDTH - 8);
    }
    style.left = left;
    style.top = top;
    style.position = "fixed";
  } else {
    style.right = 20;
    style.top = 56;
    style.position = "fixed";
  }

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        onClose();
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal={false} style={style}>
      <div className="um-utils-popover" ref={ref}>
        <div className="um-utils-header">
          <div style={{ fontWeight: 700, fontSize: 13 }}>{member.name}</div>
          <button
            onClick={onClose}
            style={{
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
            aria-label="close-utils"
          >
            ✕
          </button>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          {member.role === "admin" ? (
            <button
              onClick={() =>
                onRemoveAdmin
                  ? onRemoveAdmin(member.id)
                  : onMakeAdmin(member.id)
              }
              className="um-utils-btn um-utils-admin"
            >
              Remove admin
            </button>
          ) : (
            <button
              onClick={() => onMakeAdmin(member.id)}
              className="um-utils-btn um-utils-make"
            >
              Make admin
            </button>
          )}

          <button
            onClick={() => onRemove(member.id)}
            className="um-utils-btn um-utils-remove"
          >
            Remove member
          </button>
        </div>
      </div>
    </div>
  );
}
