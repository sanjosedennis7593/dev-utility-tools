import { defineConfig, splitVendorChunkPlugin, externalizeDepsPlugin } from "electron-vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    publicDir: false,
    plugins: [ commonjsExternals({ externals: commonjsPackages })],
    optimizeDeps: {
        exclude: externals,
      },
    main: {
        build: {
            outDir: 'dist/main'
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        build: {
            outDir: 'dist/preload'
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        plugins: [
            react(),
            splitVendorChunkPlugin()
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    }
});