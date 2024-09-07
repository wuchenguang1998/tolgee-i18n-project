import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { htmlGetLocales, downloadLocales } from "./vite.base.ts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: "./",
    plugins: [vue(), htmlGetLocales(mode), downloadLocales()],
  };
});
