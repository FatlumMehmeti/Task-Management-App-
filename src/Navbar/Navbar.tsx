import "./Navbar.css";
import Notifications from "../Notifications/Notifications";

export default function Navbar() {
  return (
    <div className="navbar">
      {/* navbar-LEFT */}
      <div className="navbar-left">Trello</div>

      {/* navbar-MIDDLE */}
      <div className="navbar-middle">
        <input className="search-bar" type="text" placeholder="Search" />
        <button className="create-button">Create</button>
      </div>

      {/* navbar-RIGHT */}
      <div className="navbar-right">
        <button className="channel-button navbar-right-button"> </button>
        <Notifications />
        <button className="information-button navbar-right-button"> </button>
        <button className="profile-button navbar-right-button"> </button>
      </div>
    </div>
  );
}
