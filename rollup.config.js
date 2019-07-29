import dts from "rollup-plugin-dts"
import typescript from "rollup-plugin-typescript2"

/** @type {import("rollup").RollupOptions[]} */
const config = [
  {
    input: "src/index.ts",
    output: [
      { file: "lib/index.js", format: "cjs" },
      { file: "lib/index.es.js", format: "es" }
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        cacheRoot: "node_modules/.cache/rpts2"
      })
    ]
  },
  {
    input: "src/index.ts",
    output: { file: "lib/index.d.ts", format: "es" },
    plugins: [dts()]
  }
]

export default config
