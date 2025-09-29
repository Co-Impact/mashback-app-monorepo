import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";

interface Prop {
  mode: string;
}
export default ({ mode }: Prop) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      port: parseInt(process.env.VITE_PORT as string),
    },
    preview: {
      port: parseInt(process.env.VITE_PORT as string),
        allowedHosts: true,
        host: true,
    },
  });
};
