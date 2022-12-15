import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import tsConfigPaths from 'rollup-plugin-ts-paths';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const banner = '/**\n* @license\n* mapcraft-api\n* Copyright (C) 2021 - 2022 Clément Bertrand (https://github.com/c-bertran)\n*\n* This program is free software: you can redistribute it and/or modify\n* it under the terms of the GNU General Public License as published by\n* the Free Software Foundation, either version 3 of the License, or\n* (at your option) any later version.\n*\n* This program is distributed in the hope that it will be useful,\n* but WITHOUT ANY WARRANTY; without even the implied warranty of\n* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n* GNU General Public License for more details.\n*/';

export default {
	external: ['7zip-min', 'better-sqlite3', 'crypto', 'events', 'fs', 'fs/promises', 'http', 'https', 'os', 'path', 'process'],
	input: {
		'backend': 'src/backend.ts',
		'cli': 'src/cli/index.ts',
		'index': 'src/index.ts'
	},
	output: [
		{
			banner,
			chunkFileNames: '[name]_[hash].[format].js',
			dir: 'dist',
			entryFileNames: '[name].[format].js',
			format: 'es'
		},
		{
			banner,
			chunkFileNames: '[name]_[hash].[format].js',
			dir: 'dist',
			entryFileNames: '[name].[format].js',
			format: 'cjs'
		}
	],
	watch: {
		clearScreen: false,
	},
	plugins: [
		nodePolyfills(),
		replace({
			preventAssignment: true,
			values: {
				'process.env.DEV': process.env.DEV ?? 'false'
			}
		}),
		tsConfigPaths(),
		json(),
		typescript(),
		terser({
			format: {
				comments: 'some'
			}
		})
	]
};
