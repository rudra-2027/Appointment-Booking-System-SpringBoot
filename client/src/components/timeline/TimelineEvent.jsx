export default function TimelineEvent({ title, description, time, tone = "bg-slate-400" }) {
  return (
    <div className="relative pl-8">
      <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${tone}`} />
      <div className="rounded-lg border border-line bg-white p-4">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
        <p className="mt-2 text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}
