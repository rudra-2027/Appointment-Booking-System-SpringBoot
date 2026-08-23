import { Inbox } from "lucide-react";

export default function EmptyState({ title, message }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <Inbox className="mx-auto text-slate-400" size={28} />
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
    </div>
  );
}
