import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Los archivos de Context exportan el provider + el hook/contexto juntos
      // (patrón estándar de React). Permitimos exports adicionales.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Patrón aceptado: inicializar estado de carga o reaccionar a cambios de
      // ruta dentro de un efecto. Lo mantenemos como aviso, no como error.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
