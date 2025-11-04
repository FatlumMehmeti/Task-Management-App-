import { useState } from "react";
import "./Navbar.css";
import UserManagementModule from "../components/UserManagement/UserManagementModule";

export default function Navbar() {
  const [userM, setUserM] = useState(false);
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
        <button className="userM-button navbar-right-button" onClick={() => setUserM((iO)=>!iO)}>Team</button>
        {(userM && <UserManagementModule/>)}
        <button className="notifications-button navbar-right-button"></button>
        <button className="channel-button navbar-right-button"> </button>
        <button className="information-button navbar-right-button"> </button>
        <button className="profile-button navbar-right-button"> </button>
      </div>
    </div>
  );
}
