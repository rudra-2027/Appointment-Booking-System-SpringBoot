import { useCallback, useEffect, useState } from "react";
import NotificationItem from "../components/notifications/NotificationItem";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Toast from "../components/ui/Toast";
import { notificationService } from "../services/notificationService";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await notificationService.list();
      setItems(data);
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const registerToken = async (event) => {
    event.preventDefault();
    try {
      await notificationService.registerToken(token);
      setMessage("FCM token registered with the backend.");
      setToken("");
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  const markRead = async (id) => {
    try {
      await notificationService.markRead(id);
      setMessage("Notification marked as read.");
      load();
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Notifications</h2>
        <p className="mt-1 text-sm text-slate-600">View persisted notification history and register a Firebase token for the signed-in account.</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      <form className="flex flex-col gap-3 rounded-lg border border-line bg-white p-5 md:flex-row" onSubmit={registerToken}>
        <input
          className="min-w-0 flex-1 rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-blue-100"
          placeholder="Firebase Cloud Messaging token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          required
        />
        <button className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Register Token</button>
      </form>
      {loading ? <LoadingSpinner label="Loading notifications" /> : items.length ? (
        <div className="grid gap-3">
          {items.map((item) => <NotificationItem key={item.id} notification={item} onRead={markRead} />)}
        </div>
      ) : <EmptyState title="No notifications" message="Email, Firebase, and scheduled reminder events will appear after the backend creates notification history." />}
      <Toast message={message} onClose={() => setMessage("")} />
    </div>
  );
}
