import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
   test: {
      env: {
         NODE_ENV: "test",
      },
      includeTaskLocation: true,
      poolOptions: {
         threads: {
            singleThread: true,
         },
      },
      setupFiles: ["dotenv/config"],
      pool: "threads",
      alias: [
         {
            find: "@module",
            replacement: resolve(__dirname, "./src/modules"),
         },
      ],
   },
});
