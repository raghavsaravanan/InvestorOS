// ESLint Configuration for InvestorOS Frontend
// This file configures ESLint with Next.js and TypeScript support for code quality and consistency.

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve current file path for ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize compatibility layer for legacy ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Configure ESLint with Next.js and TypeScript presets
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];

export default eslintConfig;
