// @ts-check

import ts from "@wessberg/rollup-plugin-ts"

/** @type {import("rollup").RollupOptions} */
const config = {
  input: "src/index.ts",
  output: [
    { file: "lib/index.js", format: "cjs" },
    { file: "lib/index.mjs", format: "es" }
  ],
  plugins: [ts({ transpiler: "babel" })],
  external: [
    ...require("module").builtinModules,
    // @ts-ignore
    ...Object.keys(require("./package.json").dependencies || {})
  ]
}

export default config
