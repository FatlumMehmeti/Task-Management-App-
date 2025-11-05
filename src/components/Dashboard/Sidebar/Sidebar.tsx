import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        <button className="boards-button">Boards</button>
        <button>Templates</button>
        <button>Home</button>

        <hr
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            marginBottom: "25px",
          }}
        />

        <p className="workspaces">Workspaces</p>
        <button>🦖 Trello Workspace</button>
      </div>
    </aside>
  );
}
