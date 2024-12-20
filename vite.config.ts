import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    base: "/bogokoapp",
    plugins: [
        // Allows using React dev server along with building a React application with Vite.
        // https://npmjs.com/package/@vitejs/plugin-react-swc
        react(),
        // Allows using the compilerOptions.paths property in tsconfig.json.
        // https://www.npmjs.com/package/vite-tsconfig-paths
        tsconfigPaths(),
        // Allows using self-signed certificates to run the dev server using HTTPS.
        // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
        // basicSsl(),
        svgr(),
    ],
    publicDir: "./public",
    server: {
        // Exposes your dev server and makes it accessible for the devices in the same network.
        host: true,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: [
                    `@import "@/shared/styles/breakpoints.scss";
                    @import "@/shared/styles/global.scss";
                    @import "@/shared/styles/mixins.scss";
                    @import "@/shared/styles/variables.scss";`,
                ],
            },
        },
    },
});
