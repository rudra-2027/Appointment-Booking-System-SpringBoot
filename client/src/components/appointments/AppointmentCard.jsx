import { CalendarClock } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

export default function AppointmentCard({ appointment, actions }) {
  const provider = appointment.provider?.email || appointment.provider?.name || "Provider";
  const user = appointment.user?.email || appointment.user?.name || "User";

  return (
    <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <CalendarClock size={18} />
            <span>{new Date(appointment.startTime).toLocaleString()}</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{user} with {provider}</p>
        </div>
        <StatusBadge tone={appointment.status === "CONFIRMED" ? "connected" : appointment.status === "REJECTED" ? "danger" : "warning"}>
          {appointment.status || "PENDING"}
        </StatusBadge>
      </div>
      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
