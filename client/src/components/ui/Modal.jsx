import { X } from "lucide-react";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          <button className="rounded-md p-1 text-slate-500 hover:bg-slate-100" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
