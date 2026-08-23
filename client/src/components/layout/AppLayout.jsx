import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-panel">
      <Topbar onMenu={() => setMobileOpen((value) => !value)} />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
