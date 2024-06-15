import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";
// import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#3c3f57",
          "@font-family": "'Inter', sans-serif",
          "@border-radius-base": "0.382rem",
          "@modal-header-border-width": 0,
          "@modal-footer-border-width": 0,
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@ant-design/icons"],
    exclude: ["js-big-decimal"],
  },
  server: {
    fs: {
      allow: ["."],
    },
    proxy: {
      "/api": {
        target: "https://info.ebarimt.mn", // The target API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/rest/merchant"), // Adjust path if necessary
      },
    },
  },
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    nodePolyfills(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true,
    //   },
    // }),
  ],
});
