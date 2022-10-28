import { defineConfig, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { visualizer } from "rollup-plugin-visualizer";
import vuetify from "vite-plugin-vuetify";

import Icons from "unplugin-icons/vite";

// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const config: UserConfig = {
    base: "/",
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      Icons({ compiler: "vue3" }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      crx({ manifest }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      // Build Target
      // https://vitejs.dev/config/build-options.html#build-target
      target: "es2022",
      // Rollup Options
      // https://vitejs.dev/config/build-options.html#build-rollupoptions
      rollupOptions: {
        // @ts-ignore
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            vue: ["vue", "vue-router", "pinia", "pinia-plugin-persistedstate"],
            vuetify: [
              "vuetify",
              "vuetify/components",
              "vuetify/directives",
              "vuetify/lib/styles/main.css",
              "webfontloader",
            ],
            materialdesignicons: ["@mdi/font/css/materialdesignicons.css"],
          },
          plugins: [
            mode === "analyze"
              ? // rollup-plugin-visualizer
                // https://github.com/btd/rollup-plugin-visualizer
                visualizer({
                  open: true,
                  filename: "dist/stats.html",
                  gzipSize: true,
                  brotliSize: true,
                })
              : undefined,
            /*
          // if you use Code encryption by rollup-plugin-obfuscator
          // https://github.com/getkey/rollup-plugin-obfuscator
          obfuscator({
            globalOptions: {
              debugProtection: true,
            },
          }),
          */
          ].filter((item) => item !== undefined),
        },
      },
      // Minify option
      // https://vitejs.dev/config/build-options.html#build-minify
      minify: "esbuild",
    },
  };
  return config;
});
