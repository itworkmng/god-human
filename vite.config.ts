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
      "/rest": {
        target: "http://info.ebarimt.mn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest/, "/rest"), // Adjust according to your API endpoint
      },
    },
  },
  plugins: [reactRefresh(), tsconfigPaths(), nodePolyfills()],
});
