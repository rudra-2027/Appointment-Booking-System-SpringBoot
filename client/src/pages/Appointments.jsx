import { useCallback, useEffect, useState } from "react";
import { appointmentService } from "../services/appointmentService";
import AppointmentCard from "../components/appointments/AppointmentCard";
import AppointmentTable from "../components/appointments/AppointmentTable";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Toast from "../components/ui/Toast";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ providerId: "", startTime: "", durationMinutes: 30 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [appointmentResponse, providerResponse] = await Promise.all([
        appointmentService.getUserAppointments(),
        appointmentService.listProviders(),
      ]);
      setAppointments(appointmentResponse.data);
      setProviders(providerResponse.data);
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const book = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await appointmentService.book({
        providerId: form.providerId,
        startTime: form.startTime,
        durationMinutes: Number(form.durationMinutes),
      });
      setMessage("Appointment request sent.");
      setForm((value) => ({ ...value, startTime: "" }));
      load();
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  const complete = async (id) => {
    try {
      await appointmentService.complete(id);
      setMessage("Appointment marked complete.");
      load();
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Appointments</h2>
        <p className="mt-1 text-sm text-slate-600">USER role console for provider discovery, booking, listing, and completion.</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      <form className="grid gap-4 rounded-lg border border-line bg-white p-5 md:grid-cols-4" onSubmit={book}>
        <label className="text-sm md:col-span-2">
          <span className="font-medium text-slate-700">Provider</span>
          <select className="mt-1 w-full rounded-md border border-line px-3 py-2" value={form.providerId} onChange={(e) => setForm({ ...form, providerId: e.target.value })} required>
            <option value="">Select provider</option>
            {providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name} ({provider.email})</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Start time</span>
          <input className="mt-1 w-full rounded-md border border-line px-3 py-2" type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
        </label>
        <label className="text-sm">
          <span className="font-medium text-slate-700">Minutes</span>
          <input className="mt-1 w-full rounded-md border border-line px-3 py-2" type="number" min="15" step="15" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })} required />
        </label>
        <button className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 md:col-span-4">Book Appointment</button>
      </form>
      {loading ? <LoadingSpinner label="Loading appointments" /> : appointments.length ? (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            {appointments.slice(0, 4).map((item) => (
              <AppointmentCard key={item.id} appointment={item} actions={<button className="rounded-md border border-line px-3 py-1.5 text-sm hover:bg-slate-50" onClick={() => complete(item.id)}>Complete</button>} />
            ))}
          </div>
          <AppointmentTable rows={appointments} />
        </>
      ) : <EmptyState title="No appointments yet" message="Book with a provider to exercise the protected user endpoints." />}
      <Toast message={message} onClose={() => setMessage("")} />
    </div>
  );
}
