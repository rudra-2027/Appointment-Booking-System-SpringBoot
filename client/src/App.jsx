import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ApiExplorer from "./pages/ApiExplorer";
import Appointments from "./pages/Appointments";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Provider from "./pages/Provider";
import TimelinePage from "./pages/Timeline";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/appointments" element={<ProtectedRoute roles={["USER"]}><Appointments /></ProtectedRoute>} />
        <Route path="/provider" element={<ProtectedRoute roles={["PROVIDER"]}><Provider /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/api-explorer" element={<ProtectedRoute><ApiExplorer /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><TimelinePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}
