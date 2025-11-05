import type { JSX } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar/Sidebar";
import DashboardBody from "./DashboardBody/DashboardBody";

export default function Dashboard(): JSX.Element {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <DashboardBody />
    </div>
  );
}
