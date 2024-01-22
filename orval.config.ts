import { defineConfig } from "orval";

export default defineConfig({
  evo: {
    output: {
      mode: "tags-split",
      target: "./src/api",
      schemas: "./src/model",
      client: "react-query",
      mock: true,
      prettier: true,
      clean: true,
      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: "cursor",
        },
        mutator: {
          path: "./src/lib/axios.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "http://localhost:8080/v3/api-docs",
    },
  },
});
