import "./Navbar.css";
import Notifications from "../Notifications/Notifications";
import { useRouter } from "@tanstack/react-router";
import { LogOut, Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import Button from "../Button";
import { useState } from "react";
import SettingsModal from "../Settings/SettingsModal";

export default function Navbar() {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
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
        <Button
          className="settings-button navbar-right-button"
          aria-label="Settings"
          icon={SettingsIcon}
          iconSize={18}
          size="icon"
          onClick={() => setSettingsOpen(true)}
        />
        <Button
          className="profile-button navbar-right-button"
          aria-label="Sign out"
          icon={LogOut}
          iconSize={18}
          size="icon"
          onClick={() => {
            try {
              localStorage.removeItem("auth");
              toast.success("Signed out");
              router.navigate({ to: "/auth/login" });
            } catch {
              toast.error("Failed to sign out");
            }
          }}
        />
      </div>
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
