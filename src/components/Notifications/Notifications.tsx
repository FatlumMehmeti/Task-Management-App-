import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import "./Notifications.css";

type NotificationType = {
  id: number;
  text: string;
  time: string;
  read?: boolean;
};

export default function Notifications() {
  const [open, setOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([
    { id: 1, text: "You were mentioned in a card", time: "2h ago" },
    { id: 2, text: "John moved 'Design Logo' to Done", time: "5h ago" },
    { id: 3, text: "New comment on 'Project Plan'", time: "1d ago" },
  ]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const addNotification = (text: string) => {
    const newNotif: NotificationType = {
      id: Date.now(),
      text,
      time: "Just now",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notifications-wrapper" ref={wrapperRef}>
      <button className="notifications-button" onClick={handleToggle}>
        <Bell size={24} strokeWidth={2} />{" "}
        {notifications.length > 0 && (  
          <span className="badge">{notifications.length}</span>
        )}
      </button>

      {open && (
        <div className="notifications-dropdown">
          <div className="dropdown-header">
            Notifications
            {notifications.length > 0 && (
              <button
                className="mark-all-read"
                onClick={() => setNotifications([])}
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="notification-item">
                <span className="notif-time">{notif.time}</span>
                <span className="notif-text">{notif.text}</span>
                <button
                  className="mark-read-btn"
                  onClick={() => markAsRead(notif.id)}
                >
                  X
                </button>
              </div>
            ))
          )}

          <button
            className="add-notif-btn"
            onClick={() => addNotification("New test notification")}
          >
            + Add Test Notification
          </button>
        </div>
      )}
    </div>
  );
}
