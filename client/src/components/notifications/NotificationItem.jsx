import { Bell, Check } from "lucide-react";

export default function NotificationItem({ notification, onRead }) {
  return (
    <div className="flex gap-3 rounded-lg border border-line bg-white p-4">
      <span className={`mt-1 rounded-md p-2 ${notification.read ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-accent"}`}>
        <Bell size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">{notification.title || "Notification"}</h3>
          {!notification.read ? (
            <button className="rounded-md p-1 text-slate-500 hover:bg-slate-100" onClick={() => onRead(notification.id)} aria-label="Mark as read">
              <Check size={16} />
            </button>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
        <p className="mt-2 text-xs text-slate-400">{notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "No timestamp"}</p>
      </div>
    </div>
  );
}
