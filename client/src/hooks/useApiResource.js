import { useCallback, useEffect, useState } from "react";

export function useApiResource(loader, enabled = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError("");
    try {
      const response = await loader();
      setData(response.data);
    } catch (err) {
      setError(err.friendlyMessage || err.message);
    } finally {
      setLoading(false);
    }
  }, [enabled, loader]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, setData };
}
