import React from "react";
import MemberItem from "./MemberItem";
import type { Member } from "./MemberItem";

interface Props {
  members: Member[];
  onOpenUtils?: (m: Member, anchor?: DOMRect) => void;
}

export default function MemberList({
  members,
  onOpenUtils,
}: Props): React.ReactElement {
  if (!members || members.length === 0) {
    return <div style={{ padding: 12 }}>No members yet.</div>;
  }

  return (
    <div className="um-list">
      {members.map((m) => (
        <MemberItem key={m.id} member={m} onOpenUtils={onOpenUtils} />
      ))}
    </div>
  );
}
