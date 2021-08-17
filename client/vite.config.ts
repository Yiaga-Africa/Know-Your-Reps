import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import reactSVGPlugin from "vite-plugin-react-svg"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh(), reactSVGPlugin({ useSVGO: true })],
    server: {
        proxy: {
            "^/api/*": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
