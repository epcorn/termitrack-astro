import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
export default {
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    proxy: {
      "/api/": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
};
