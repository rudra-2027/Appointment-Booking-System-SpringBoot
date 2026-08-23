import { useMemo, useState } from "react";
import ApiEndpointCard from "../components/api/ApiEndpointCard";
import RequestBuilder from "../components/api/RequestBuilder";
import ResponseViewer from "../components/api/ResponseViewer";
import StatusBadge from "../components/ui/StatusBadge";
import { api, API_BASE_URL } from "../services/api";

const endpoints = [
  { method: "POST", path: "/auth/login", role: "Public", description: "Exchange email and password for a JWT.", body: { email: "user@example.com", password: "password" } },
  { method: "POST", path: "/auth/register/user", role: "Public", description: "Create a user account.", body: { name: "Test User", email: "user@example.com", password: "password" } },
  { method: "POST", path: "/auth/register/provider", role: "Public", description: "Create a provider account.", body: { name: "Test Provider", email: "provider@example.com", password: "password" } },
  { method: "GET", path: "/providers", role: "USER", description: "List providers that can accept bookings." },
  { method: "POST", path: "/appointment/book", role: "USER", description: "Book a provider appointment.", body: { providerId: "provider-uuid", startTime: "2026-08-23T10:00:00", durationMinutes: 30 } },
  { method: "GET", path: "/user/appointments", role: "USER", description: "List appointments for the current user." },
  { method: "PUT", path: "/user/appointments/{id}/complete", role: "USER", description: "Mark a user appointment complete.", pathParam: "{id}" },
  { method: "GET", path: "/provider/appointments", role: "PROVIDER", description: "List incoming provider appointments." },
  { method: "POST", path: "/provider/appointments", role: "PROVIDER", description: "Create provider availability.", body: { dayOfWeek: "MONDAY", startTime: "09:00", endTime: "17:00" } },
  { method: "PUT", path: "/provider/appointments/{id}/confirm", role: "PROVIDER", description: "Confirm an incoming appointment.", pathParam: "{id}" },
  { method: "PUT", path: "/provider/appointments/{id}/reject", role: "PROVIDER", description: "Reject an incoming appointment.", pathParam: "{id}" },
  { method: "GET", path: "/notification", role: "Authenticated", description: "Read notification history." },
  { method: "POST", path: "/notification/register?token={token}", role: "Authenticated", description: "Register a Firebase token for push delivery.", pathParam: "{token}" },
  { method: "PUT", path: "/notification/{id}/read", role: "Authenticated", description: "Mark notification as read.", pathParam: "{id}" },
];

export default function ApiExplorer() {
  const [selected, setSelected] = useState(endpoints[0]);
  const [payload, setPayload] = useState(JSON.stringify(endpoints[0].body || {}, null, 2));
  const [pathValue, setPathValue] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resolvedPath = useMemo(() => {
    if (!selected.pathParam || !pathValue) return selected.path;
    return selected.path.replace(selected.pathParam, encodeURIComponent(pathValue));
  }, [selected, pathValue]);

  const selectEndpoint = (endpoint) => {
    setSelected(endpoint);
    setPayload(JSON.stringify(endpoint.body || {}, null, 2));
    setPathValue("");
    setResponse(null);
    setError("");
  };

  const send = async () => {
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      const body = selected.body ? JSON.parse(payload || "{}") : undefined;
      const { data, status } = await api.request({ method: selected.method, url: resolvedPath, data: body });
      setResponse({ status, data });
    } catch (err) {
      setError(err.friendlyMessage || err.message);
      if (err.response) setResponse({ status: err.response.status, data: err.response.data });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-xl font-semibold text-ink">API Explorer</h2>
          <p className="mt-1 text-sm text-slate-600">Interactive Axios client using the same VITE_API_BASE_URL as the app.</p>
        </div>
        <StatusBadge tone="info">{API_BASE_URL}</StatusBadge>
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.35fr]">
        <div className="grid gap-3">
          {endpoints.map((endpoint) => (
            <ApiEndpointCard
              key={`${endpoint.method}-${endpoint.path}`}
              {...endpoint}
              selected={selected === endpoint}
              onClick={() => selectEndpoint(endpoint)}
            />
          ))}
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-line bg-white p-4">
            <p className="font-mono text-sm font-semibold text-ink">{selected.method} {resolvedPath}</p>
            <p className="mt-2 text-sm text-slate-600">{selected.description}</p>
            {selected.pathParam ? (
              <input className="mt-3 w-full rounded-md border border-line px-3 py-2 text-sm" placeholder={`Replace ${selected.pathParam}`} value={pathValue} onChange={(event) => setPathValue(event.target.value)} />
            ) : null}
          </div>
          <RequestBuilder payload={payload} setPayload={setPayload} onSend={send} loading={loading} />
          <ResponseViewer response={response} error={error} />
        </div>
      </div>
    </div>
  );
}
