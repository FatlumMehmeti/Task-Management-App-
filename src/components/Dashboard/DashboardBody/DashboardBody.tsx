import "./DashboardBody.css";
import RecentlyViewed from "./RecentlyViewed/RecentlyViewed";
import MyBoards from "./MyBoards/MyBoards";

export default function DashboardBody() {
  return (
    <div className="dashboard-body">
      {/* Placeholder for RecVw */}
      <div className="recently-viewed-placeholder">
        <RecentlyViewed />
      </div>

      <MyBoards />
    </div>
  );
}
