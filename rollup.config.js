import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
/*
import ts from 'rollup-plugin-ts';
import { typescriptPaths  } from 'rollup-plugin-typescript-paths';
*/

const banner = `/**\n* @license\n* mapcraft-api\n* Copyright (C) 2021 - ${new Date().getFullYear()} Clément Bertrand (https://github.com/c-bertran)\n*\n* This program is free software: you can redistribute it and/or modify\n* it under the terms of the GNU General Public License as published by\n* the Free Software Foundation, either version 3 of the License, or\n* (at your option) any later version.\n*\n* This program is distributed in the hope that it will be useful,\n* but WITHOUT ANY WARRANTY; without even the implied warranty of\n* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n* GNU General Public License for more details.\n*/`;

export default [
	{
		external: [
			'7zip-bin', 'better-sqlite3', 'child_process', 'crypto', 'events',
			'fs', 'fs/promises', 'http', 'https', 'os', 'path', 'process', 'prompts',
			'url'
		],
		input: {
			'backend': 'src/backend.ts',
			'cli': 'src/cli/index.ts',
			'frontend': 'src/frontend.ts',
			'datapackGenSlot': 'src/datapack_gen/slot.ts'
		},
		output: [
			{
				banner,
				chunkFileNames: '[name]_[hash].[format].js',
				dir: 'dist',
				entryFileNames: '[name].[format].js',
				format: 'es'
			}
		],
		watch: {
			clearScreen: false,
		},
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					'process.env.DEV': process.env.DEV ?? 'false'
				}
			}),
			json(),
			typescript(),
			/*
			typescriptPaths(),
			ts({
				browserslist: false,
				tsconfig: 'tsconfig.json',
			}),
			*/
			terser({
				compress: (process.env.DEV !== true),
				format: {
					comments: 'some'
				}
			}),
			copy({
				targets: [
					{
						src: 'src/assets',
						dest: 'dist'
					}
				]
			})
		]
	},
	/*
	{
		input: './dist/types/src/backend.d.ts',
		output: [
			{
				file: './dist/backend.d.ts',
				format: 'es'
			}
		],
		plugins: [
			ts({
				browserslist: false,
				tsconfig: 'tsconfig.json'
			})
		]
	},
	*/
	/*
	{
		input: './dist/types/src/frontend.d.ts',
		output: [
			{
				file: './dist/frontend.d.ts',
				format: 'es',
			}
		],
		plugins: [
			dts({
				compilerOptions: {
					baseUrl: compilerOptions.baseUrl,
					paths: compilerOptions.paths,
				}
			})
		]
	}
	*/
];
