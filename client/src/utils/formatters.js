export function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function normalizeRole(value) {
  return (value || "").replace("ROLE_", "");
}
