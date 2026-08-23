import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../ui/StatusBadge";

export default function Topbar({ onMenu }) {
  const { isAuthenticated, user, role, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-line bg-white px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden" onClick={onMenu} aria-label="Open navigation">
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-ink">Appointment API Console</h1>
          <p className="truncate text-xs text-slate-500">{API_BASE_URL || "VITE_API_BASE_URL not set"}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge tone="connected">API Connected</StatusBadge>
        {isAuthenticated ? (
          <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex">
            <ShieldCheck size={17} className="text-brand" />
            <span className="max-w-36 truncate">{user.email}</span>
            <StatusBadge>{role}</StatusBadge>
          </div>
        ) : null}
        {isAuthenticated ? (
          <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-ink" onClick={logout} aria-label="Log out">
            <LogOut size={18} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
