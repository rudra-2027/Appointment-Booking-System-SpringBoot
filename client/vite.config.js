import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_API_BASE_URL || "http://localhost:8080";

  return {
    esbuild: {
      jsx: "automatic",
    },
    server: {
      host: "127.0.0.1",
      port: 5173,
      cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
      },
      proxy: {
        "/auth": backendUrl,
        "/appointment": backendUrl,
        "/appointments": backendUrl,
        "/providers": backendUrl,
        "/provider": backendUrl,
        "/user": backendUrl,
        "/notification": backendUrl,
        "/v3": backendUrl,
        "/swagger-ui": backendUrl,
      },
    },
  };
});
