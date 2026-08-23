import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-4 text-sm text-slate-600">
      <Loader2 className="animate-spin" size={18} />
      <span>{label}</span>
    </div>
  );
}
