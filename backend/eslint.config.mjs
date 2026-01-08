import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // 1. Add eslint.config.mjs to ignores so it doesn't try to type-check itself
    ignores: [
      "dist/", 
      "node_modules/", 
      "build/", 
      ".env", 
      ".env.test", 
      "package.json", 
      "package-lock.json",
      "eslint.config.mjs" 
    ],
  },
  {
    plugins: {
      import: importPlugin
    },
    // 2. Add languageOptions to link your TSConfig
    languageOptions: {
      parserOptions: {
        project: true, // Tells tseslint to find the nearest tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-namespace": ["error", { "allowDeclarations": true }],
      "no-console": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "no-return-await": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          "varsIgnorePattern": "^_", 
          "argsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
    }
  },
);