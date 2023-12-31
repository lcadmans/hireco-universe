import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glslify from 'rollup-plugin-glslify'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/hireco-universe/',
	plugins: [react(), glslify()]
})
