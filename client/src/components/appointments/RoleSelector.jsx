export default function RoleSelector({ role, setRole }) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-white p-1">
      {["USER", "PROVIDER"].map((item) => (
        <button
          key={item}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${role === item ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100"}`}
          onClick={() => setRole(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
