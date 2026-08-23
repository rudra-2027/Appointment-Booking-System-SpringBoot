import { toJson } from "../../utils/format.js";

export default function JsonViewer({ value }) {
  return (
    <pre className="max-h-96 overflow-auto rounded-md border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100">
      {typeof value === "string" ? value : toJson(value)}
    </pre>
  );
}
