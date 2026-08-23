import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import RoleSelector from "./appointments/RoleSelector";

export default function AuthForm({ mode, onSubmit, loading }) {
  const [role, setRole] = useState("USER");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const isRegister = mode === "register";

  const update = (key) => (event) => setForm((value) => ({ ...value, [key]: event.target.value }));

  return (
    <form
      className="rounded-lg border border-line bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form, role);
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-ink">{isRegister ? "Register Account" : "Sign In"}</h2>
          <p className="mt-1 text-sm text-slate-500">{isRegister ? "Creates a USER or PROVIDER through the backend." : "Stores the returned JWT locally for API calls."}</p>
        </div>
        {isRegister ? <RoleSelector role={role} setRole={setRole} /> : null}
      </div>
      <div className="space-y-3">
        {isRegister ? (
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Name</span>
            <input className="mt-1 w-full rounded-md border border-line px-3 py-2 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100" value={form.name} onChange={update("name")} required />
          </label>
        ) : null}
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Email</span>
          <input type="email" className="mt-1 w-full rounded-md border border-line px-3 py-2 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100" value={form.email} onChange={update("email")} required />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Password</span>
          <input type="password" className="mt-1 w-full rounded-md border border-line px-3 py-2 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100" value={form.password} onChange={update("password")} required />
        </label>
      </div>
      <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60" disabled={loading}>
        {isRegister ? <UserPlus size={17} /> : <LogIn size={17} />}
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
}
