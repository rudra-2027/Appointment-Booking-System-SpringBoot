export default function StatCard({ label, value, helper, icon: Icon }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
        </div>
        {Icon ? (
          <span className="rounded-md bg-slate-100 p-2 text-slate-700">
            <Icon size={18} />
          </span>
        ) : null}
      </div>
      {helper ? <p className="mt-3 text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}
