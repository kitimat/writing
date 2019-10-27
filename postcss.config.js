module.exports = {
  modules: true,
  plugins: [
    require("postcss-css-variables"),
    require("autoprefixer")({
      grid: "autoplace"
    })
  ]
};
