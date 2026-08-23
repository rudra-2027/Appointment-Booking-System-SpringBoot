export default function RoleSelector({ value, onChange }) {
  return (
    <div className="rounded-md bg-slate-100 p-1">
      {["USER", "PROVIDER"].map((role) => (
        <button
          key={role}
          type="button"
          className={`rounded px-3 py-1.5 text-sm font-semibold ${value === role ? "bg-white shadow-sm" : "text-slate-500"}`}
          onClick={() => onChange(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
}
