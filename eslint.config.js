import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",

      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      indent: ["warn", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["warn", "double", { avoidEscape: true }],
      semi: ["warn", "always"],

      "arrow-spacing": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",

      "no-process-env": "off",
    },
  },
  {
    files: ["**/*.js"],
    rules: {},
  },
  {
    files: ["frontend/**/*.js"],
    rules: {},
  },
  {
    files: ["backend/**/*.js"],
    rules: {},
  },
];
