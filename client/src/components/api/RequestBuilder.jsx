import { Send } from "lucide-react";

export default function RequestBuilder({ payload, setPayload, onSend, loading }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-ink">Request Body</h3>
        <button
          className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onSend}
          disabled={loading}
        >
          <Send size={16} />
          Send
        </button>
      </div>
      <textarea
        className="min-h-56 w-full rounded-lg border border-line bg-slate-50 p-3 font-mono text-sm outline-none focus:border-accent focus:ring-2 focus:ring-blue-100"
        value={payload}
        onChange={(event) => setPayload(event.target.value)}
        spellCheck="false"
      />
    </div>
  );
}
