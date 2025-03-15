import { defineConfig } from "tsup";

export default defineConfig({
   minify: true,
   outDir: "dist",
   entry: ["src/index.ts"],
   dts: true,
   sourcemap: true,
   target: "es2020",
   format: ["cjs", "esm"],
   cjsInterop: true,
   clean: true,
});
