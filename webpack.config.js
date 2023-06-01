const path = require("path");

module.exports = {
  mode: "production",
  output: {
    filename: "app.js",
    clean: true,
  },
  entry: "./js/index.js",
};
