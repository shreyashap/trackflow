import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/tests/setup"],
    environment: "node",
    globals: true,
    maxWorkers : 1
  },
  mode :"test",
});
