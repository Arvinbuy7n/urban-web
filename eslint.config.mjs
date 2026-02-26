import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "off",
    },
  },
];
