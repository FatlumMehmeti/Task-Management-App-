import type { JSX } from "react";
import TaskModule from "../../components/TaskModule/TaskModule";

export default function Dashboard(): JSX.Element {
  return (
    <div style={{ padding: 16 }}>
      <h1 className="section-title">Dashboard</h1>
      <TaskModule />
    </div>
  );
}
