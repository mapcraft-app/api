import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import tsConfigPaths from 'rollup-plugin-ts-paths';
import typescript from '@rollup/plugin-typescript';

export default {
	external: ['7zip-min', 'events', 'http', 'https', 'fs', 'fs/promises', 'path', 'process', 'os'],
	input: {
		'module': 'src/index.ts',
		'cli': 'src/cli/index.ts'
	},
	output: [
		{
			entryFileNames: '[name].[format].js',
			format: 'es',
			dir: 'dist'
		},
		{
			entryFileNames: '[name].[format].js',
			format: 'cjs',
			dir: 'dist'
		}
	],
	plugins: [
		tsConfigPaths(),
		json(),
		typescript(),
		// terser()
	]
};
