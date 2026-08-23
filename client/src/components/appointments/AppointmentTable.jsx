import StatusBadge from "../ui/StatusBadge";

export default function AppointmentTable({ rows = [] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">End</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.startTime ? new Date(row.startTime).toLocaleString() : "-"}</td>
                <td className="px-4 py-3">{row.endTime ? new Date(row.endTime).toLocaleString() : "-"}</td>
                <td className="px-4 py-3">{row.user?.email || row.user?.name || "-"}</td>
                <td className="px-4 py-3">{row.provider?.email || row.provider?.name || "-"}</td>
                <td className="px-4 py-3"><StatusBadge>{row.status || "PENDING"}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
