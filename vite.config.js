import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const processEnvValues = {
		'process.env': Object.entries(env).reduce((prev, [key, val]) => {
			console.log(key, val);
			return {
				...prev,
				[key]: val
			};
		}, {})
	};

	return {
		plugins: [react(), tailwindcss()],
		define: processEnvValues
	};
});
