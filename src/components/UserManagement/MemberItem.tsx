import React from "react";
import "./UserManagement.css";

export interface Member {
  id: string;
  name: string;
  email?: string;
  role?: "member" | "admin";
  avatarUrl?: string;
}

interface Props {
  member: Member;
  onOpenUtils?: (m: Member, anchor?: DOMRect) => void;
}

export default function MemberItem({
  member,
  onOpenUtils,
}: Props): React.ReactElement {
  return (
    <div className="um-member">
      <div className="um-avatar" aria-hidden>
        {member.name ? member.name.charAt(0).toUpperCase() : "?"}
      </div>

      <div className="um-member-info">
        <div className="um-name">{member.name}</div>
        <div className="um-email">{member.email}</div>
      </div>

      <div className="um-role">{member.role ?? "member"}</div>

      <button
        onClick={(e) =>
          onOpenUtils?.(
            member,
            (e.currentTarget as HTMLElement).getBoundingClientRect()
          )
        }
        className="um-options"
        aria-label={`options-${member.id}`}
      >
        ⋯
      </button>
    </div>
  );
}
