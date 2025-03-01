import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: "development", // development | production ( npm run build --mode __모드__ ) 
  resolve: {
    extensions: [ '.js', '.ts', '.jsx', '.tsx' ],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        app: resolve( __dirname, 'src/ts/app.ts' ), // EP. R
      },
      output: {
        entryFileNames: 'js/[name].min.js',
        assetFileNames: 'assets/[mame].[ext]', // OUTPUT file namming 
      }
    }
  },
  server: {
    // host: '192.168.0.33',
    port: 9000,
    open: true,
    cors: true,
  }
})
