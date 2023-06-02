const path = require("path");

module.exports = {
  mode: "production",
  output: {
    filename: "app.js",
    clean: true,
  },
  watch: true,
  entry: "./js/index.js",
};
