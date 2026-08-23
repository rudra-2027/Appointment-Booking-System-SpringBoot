import JsonViewer from "./JsonViewer";
import ErrorState from "../ui/ErrorState";

export default function ResponseViewer({ response, error }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-ink">Response</h3>
      {error ? <ErrorState message={error} /> : <JsonViewer value={response || { status: "Waiting for request" }} />}
    </div>
  );
}
