// vite.config.js
import { defineConfig } from "file:///D:/PROJECTS/novecograd-front/node_modules/vite/dist/node/index.js";
import react from "file:///D:/PROJECTS/novecograd-front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mkcert from "file:///D:/PROJECTS/novecograd-front/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\PROJECTS\\novecograd-front";
var vite_config_default = defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  },
  server: {
    // @ts-ignore: needed
    https: true,
    port: 5173,
    strictPort: true,
    open: true
  },
  base: "/novecograd"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQUk9KRUNUU1xcXFxub3ZlY29ncmFkLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQUk9KRUNUU1xcXFxub3ZlY29ncmFkLWZyb250XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9QUk9KRUNUUy9ub3ZlY29ncmFkLWZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW3JlYWN0KCksIG1rY2VydCgpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy8nKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICAvLyBAdHMtaWdub3JlOiBuZWVkZWRcbiAgICAgICAgaHR0cHM6IHRydWUsXG4gICAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgfSxcbiAgICBiYXNlOiAnL25vdmVjb2dyYWQnLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsb0JBQW9CO0FBQ3pTLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsUUFBUTtBQUFBLElBQ3pDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFSixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0EsTUFBTTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
