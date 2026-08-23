import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message }) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
      <div className="flex items-start gap-2">
        <AlertTriangle className="mt-0.5 shrink-0" size={18} />
        <span>{message}</span>
      </div>
    </div>
  );
}
