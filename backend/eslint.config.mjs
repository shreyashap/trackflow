import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import {defineConfig} from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/", "node_modules/", "build/",".env",".env.test"],
  },
  {
    rules: {
      "@typescript-eslint/no-namespace": ["error", { "allowDeclarations": true }],
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          "varsIgnorePattern": "^_", 
          "argsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
    }
  },
  eslintConfigPrettier,
);