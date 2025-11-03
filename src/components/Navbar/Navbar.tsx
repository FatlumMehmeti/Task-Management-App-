import "./Navbar.css";
import { Link, useRouter } from "@tanstack/react-router";
import { Bell, MessageSquare, Info, Plus, LogOut } from "lucide-react";
import Button from "../Button";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="navbar">
      {/* navbar-LEFT */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand" aria-label="Go to dashboard">
          Trello
        </Link>
      </div>

      {/* navbar-MIDDLE */}
      <div className="navbar-middle">
        <input className="search-bar" type="text" placeholder="Search" />
        <Button
          className="create-button"
          icon={Plus}
          iconSize={16}
          text="Create"
        />
      </div>

      {/* navbar-RIGHT */}
      <div className="navbar-right">
        <Button
          className="notifications-button navbar-right-button"
          aria-label="Notifications"
          icon={Bell}
          iconSize={18}
          size="icon"
        />
        <Button
          className="channel-button navbar-right-button"
          aria-label="Messages"
          icon={MessageSquare}
          iconSize={18}
          size="icon"
        />
        <Button
          className="information-button navbar-right-button"
          aria-label="Information"
          icon={Info}
          iconSize={18}
          size="icon"
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
    </div>
  );
}
