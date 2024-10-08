// vite.config.js
import { defineConfig } from "file:///D:/NT_Project/Summary/fe/node_modules/vite/dist/node/index.js";
import react from "file:///D:/NT_Project/Summary/fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import axios from "file:///D:/NT_Project/Summary/fe/node_modules/axios/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      constants: "/src/constants",
      api: "/src/api"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxOVF9Qcm9qZWN0XFxcXFN1bW1hcnlcXFxcZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE5UX1Byb2plY3RcXFxcU3VtbWFyeVxcXFxmZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTlRfUHJvamVjdC9TdW1tYXJ5L2ZlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzcmM6IFwiL3NyY1wiLFxuICAgICAgYXNzZXRzOiBcIi9zcmMvYXNzZXRzXCIsXG4gICAgICBjb21wb25lbnRzOiBcIi9zcmMvY29tcG9uZW50c1wiLFxuICAgICAgY29uc3RhbnRzOiBcIi9zcmMvY29uc3RhbnRzXCIsXG4gICAgICBhcGk6IFwiL3NyYy9hcGlcIlxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUSxTQUFTLG9CQUFvQjtBQUMvUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
