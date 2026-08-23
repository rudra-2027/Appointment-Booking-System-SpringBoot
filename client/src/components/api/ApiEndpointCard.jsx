import StatusBadge from "../ui/StatusBadge";

const methodTone = {
  GET: "info",
  POST: "connected",
  PUT: "warning",
  DELETE: "danger",
};

export default function ApiEndpointCard({ method, path, role, description, selected, onClick }) {
  return (
    <button
      className={`w-full rounded-lg border p-4 text-left transition hover:border-slate-400 ${
        selected ? "border-accent bg-blue-50" : "border-line bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={methodTone[method] || "neutral"}>{method}</StatusBadge>
        <span className="font-mono text-sm font-semibold text-ink">{path}</span>
      </div>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <p className="mt-3 text-xs text-slate-500">Role: {role}</p>
    </button>
  );
}
