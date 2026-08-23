import { Bell, CalendarCheck, KeyRound, Network, ServerCog } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import { API_BASE_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";

const flows = [
  ["React.js", "Interactive Vite client on localhost:5173"],
  ["Axios", "Central API service with JWT interceptor"],
  ["Spring Boot REST API", API_BASE_URL],
  ["JWT Authorization", "USER and PROVIDER method security"],
  ["JPA/PostgreSQL", "Backend persistence remains in Spring Boot"],
  ["Email/Firebase", "Notification and reminder services stay server-side"],
];

export default function Dashboard() {
  const { isAuthenticated, role } = useAuth();

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <StatusBadge tone="connected">REST Ready</StatusBadge>
              <StatusBadge tone={isAuthenticated ? "connected" : "warning"}>{isAuthenticated ? `${role} Token Active` : "Auth Required"}</StatusBadge>
            </div>
            <h2 className="text-2xl font-semibold text-ink">BookFlow Developer Portal</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              A focused API console for exercising the existing appointment backend with real auth, role protected calls,
              provider scheduling, notifications, and request inspection.
            </p>
          </div>
          <Link className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-700" to="/api-explorer">
            Open API Explorer
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Auth endpoints" value="3" helper="/auth/login and registration" icon={KeyRound} />
        <StatCard label="Appointment flows" value="5" helper="Book, list, confirm, reject, complete" icon={CalendarCheck} />
        <StatCard label="Notification API" value="3" helper="FCM token, list, read state" icon={Bell} />
        <StatCard label="Swagger" value="/swagger-ui" helper="Backend documentation URL" icon={Network} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-line bg-white p-5">
          <h3 className="text-sm font-semibold text-ink">Runtime Architecture</h3>
          <div className="mt-4 space-y-3">
            {flows.map(([title, detail], index) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">{index + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="text-sm text-slate-500">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <div className="flex items-center gap-2">
            <ServerCog size={18} className="text-brand" />
            <h3 className="text-sm font-semibold text-ink">Backend Boundary</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The Spring Boot backend remains at the repository root. All frontend code, dependencies, Vite config,
            Tailwind styles, services, hooks, and pages live inside the separate client folder.
          </p>
        </div>
      </section>
    </div>
  );
}
