import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-sm items-center gap-3 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-soft">
      <CheckCircle2 className="text-emerald-600" size={18} />
      <span>{message}</span>
      <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={onClose} aria-label="Close toast">
        <X size={16} />
      </button>
    </div>
  );
}
