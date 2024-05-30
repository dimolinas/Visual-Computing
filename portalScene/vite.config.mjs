import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    root: 'src/',
    publicDir: '../static/',
    base: './',
    plugins: [glsl()],
});