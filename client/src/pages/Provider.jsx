import { useCallback, useEffect, useState } from "react";
import AppointmentCard from "../components/appointments/AppointmentCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Toast from "../components/ui/Toast";
import { appointmentService } from "../services/appointmentService";

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export default function Provider() {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState({ dayOfWeek: "MONDAY", startTime: "09:00", endTime: "17:00" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await appointmentService.getProviderAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createAvailability = async (event) => {
    event.preventDefault();
    try {
      await appointmentService.createAvailability(availability);
      setMessage("Availability published.");
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  const updateAppointment = async (id, action) => {
    try {
      await appointmentService[action](id);
      setMessage(`Appointment ${action}ed.`);
      load();
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Provider Console</h2>
        <p className="mt-1 text-sm text-slate-600">PROVIDER role endpoints for availability and incoming appointment decisions.</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      <form className="grid gap-4 rounded-lg border border-line bg-white p-5 md:grid-cols-4" onSubmit={createAvailability}>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Day</span>
          <select className="mt-1 w-full rounded-md border border-line px-3 py-2" value={availability.dayOfWeek} onChange={(e) => setAvailability({ ...availability, dayOfWeek: e.target.value })}>
            {days.map((day) => <option key={day}>{day}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Start</span>
          <input className="mt-1 w-full rounded-md border border-line px-3 py-2" type="time" value={availability.startTime} onChange={(e) => setAvailability({ ...availability, startTime: e.target.value })} />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">End</span>
          <input className="mt-1 w-full rounded-md border border-line px-3 py-2" type="time" value={availability.endTime} onChange={(e) => setAvailability({ ...availability, endTime: e.target.value })} />
        </label>
        <button className="self-end rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Publish Availability</button>
      </form>
      {loading ? <LoadingSpinner label="Loading provider appointments" /> : appointments.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {appointments.map((item) => (
            <AppointmentCard
              key={item.id}
              appointment={item}
              actions={
                <>
                  <button className="rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-white" onClick={() => updateAppointment(item.id, "confirm")}>Confirm</button>
                  <button className="rounded-md border border-line px-3 py-1.5 text-sm hover:bg-slate-50" onClick={() => updateAppointment(item.id, "reject")}>Reject</button>
                </>
              }
            />
          ))}
        </div>
      ) : <EmptyState title="No incoming appointments" message="Requests booked by users will appear here for confirm or reject actions." />}
      <Toast message={message} onClose={() => setMessage("")} />
    </div>
  );
}
