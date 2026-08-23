import { NavLink } from "react-router-dom";
import { Activity, Bell, CalendarDays, KeyRound, LayoutDashboard, Network, UserRoundCog, Workflow } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/authentication", label: "Auth", icon: KeyRound },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/provider", label: "Provider", icon: UserRoundCog },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/api-explorer", label: "API Explorer", icon: Network },
  { to: "/timeline", label: "Timeline", icon: Workflow },
];

export default function Sidebar({ mobileOpen, onNavigate }) {
  return (
    <aside className={`${mobileOpen ? "block" : "hidden"} border-r border-line bg-white md:block md:w-64 md:shrink-0`}>
      <div className="flex h-full flex-col gap-2 p-3">
        <div className="mb-3 hidden items-center gap-2 px-2 py-3 md:flex">
          <span className="rounded-md bg-brand p-2 text-white"><Activity size={18} /></span>
          <div>
            <p className="text-sm font-semibold text-ink">BookFlow</p>
            <p className="text-xs text-slate-500">Developer Portal</p>
          </div>
        </div>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
