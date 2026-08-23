import { useCallback } from "react";
import Timeline from "../components/timeline/Timeline";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useApiResource } from "../hooks/useApiResource";
import { appointmentService } from "../services/appointmentService";
import { notificationService } from "../services/notificationService";
import { useAuth } from "../context/AuthContext";

export default function TimelinePage() {
  const { role } = useAuth();
  const appointmentLoader = useCallback(
    () => role === "PROVIDER" ? appointmentService.getProviderAppointments() : appointmentService.getUserAppointments(),
    [role]
  );
  const { data: appointments, loading, error } = useApiResource(appointmentLoader);
  const { data: notifications } = useApiResource(notificationService.list);

  const events = [
    ...appointments.map((appointment) => ({
      title: `Appointment ${appointment.status || "PENDING"}`,
      description: `${appointment.user?.email || "User"} with ${appointment.provider?.email || "provider"}`,
      time: appointment.startTime ? new Date(appointment.startTime).toLocaleString() : "No start time",
      tone: appointment.status === "CONFIRMED" ? "bg-emerald-500" : appointment.status === "REJECTED" ? "bg-rose-500" : "bg-amber-500",
    })),
    ...notifications.map((notification) => ({
      title: notification.title || "Notification",
      description: notification.message || "Notification history entry",
      time: notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "No timestamp",
      tone: notification.read ? "bg-slate-400" : "bg-blue-500",
    })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Timeline</h2>
        <p className="mt-1 text-sm text-slate-600">A combined operational view from appointment and notification endpoints.</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      {loading ? <LoadingSpinner label="Building timeline" /> : events.length ? <Timeline events={events} /> : <EmptyState title="No timeline events" message="Appointments and notification history will populate this view." />}
    </div>
  );
}
