import { useState } from "react";
import AuthForm from "../components/AuthForm";
import JsonViewer from "../components/api/JsonViewer";
import ErrorState from "../components/ui/ErrorState";
import Toast from "../components/ui/Toast";
import { useAuth } from "../context/AuthContext";

export default function Authentication() {
  const { login, register, loading, isAuthenticated, user, role, logout } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async ({ email, password }) => {
    setError("");
    try {
      await login({ email, password });
      setMessage("JWT stored and ready for API calls.");
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  const handleRegister = async (form, selectedRole) => {
    setError("");
    try {
      await register(form, selectedRole);
      setMessage(`${selectedRole} registered. Sign in to receive a JWT.`);
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Authentication</h2>
        <p className="mt-1 text-sm text-slate-600">Calls the existing Spring Boot auth endpoints and stores the returned bearer token.</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      <div className="grid gap-5 lg:grid-cols-2">
        <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
        <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />
      </div>
      <div className="rounded-lg border border-line bg-white p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">Session</h3>
          {isAuthenticated ? <button className="rounded-md border border-line px-3 py-1.5 text-sm hover:bg-slate-50" onClick={logout}>Logout</button> : null}
        </div>
        <JsonViewer value={isAuthenticated ? { email: user.email, role, token: "Stored in localStorage" } : { authenticated: false }} />
      </div>
      <Toast message={message} onClose={() => setMessage("")} />
    </div>
  );
}
