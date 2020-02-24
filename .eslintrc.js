module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
      "plugin:vue/essential",
      "@vue/prettier",
      "eslint:recommended",
  //   "airbnb-base",
  //   "plugin:vue/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "linebreak-style": ["error", "windows"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
