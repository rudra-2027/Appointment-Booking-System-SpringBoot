import { LogIn, UserPlus } from "lucide-react";

export default function AuthForm({ mode, form, setForm, loading }) {
  return (
    <div className="space-y-4">
      {mode === "register" ? <input className="field" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /> : null}
      <input className="field" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
      <input className="field" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
        {loading ? "Working" : mode === "login" ? "Login" : "Register"}
      </button>
    </div>
  );
}
