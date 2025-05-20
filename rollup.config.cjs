const resolve = require("@rollup/plugin-node-resolve").default;
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const typescript = require("rollup-plugin-typescript2");
const postcss = require("rollup-plugin-postcss");

module.exports = {
  input: "index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    postcss({
      inject: true,
      minimize: true,
      modules: false,
      config: {
        path: "./postcss.config.js",
      },
    }),
  ],
};
