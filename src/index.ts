/**
 * mapcraft-api
 * Copyright (C) 2021 - 2022 Clément Bertrand (https://gitlab.com/cbertran/mapcraft-api)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import minecraft from './minecraft';
import { download, formatString } from './misc';
import engine from './engine';

import { envInterface } from './engine/interface';
import datapack from './engine/datapack';
import resourcepack from './engine/resourcepack';
const envTest = {
	app: 'C:\\Users\\Clement\\Desktop\\MAPCRAFT\\software\\dist',
	appData: 'C:\\Users\\Clement\\AppData\\Roaming\\Electron\\appdata',
	date: '2022_11_21T14_26_44_313Z',
	game: 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft',
	log: 'C:\\Users\\Clement\\AppData\\Roaming\\Electron\\logs',
	resource: 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft\\resourcepacks',
	save: 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft\\saves',
	temp: 'C:\\Users\\Clement\\AppData\\Local\\Temp',
} as envInterface;
const test = new datapack(envTest, 'plip', '1.19');
test.install()
	.then((d) => console.log('plip', d))
	.catch((e) => console.error('plop', e));
test.instanceDownload?.on('data', (d) => {
	console.log('test', d);
});

const tutu = new resourcepack(envTest, 'plip', '1.19');
tutu.install()
	.then((d) => console.log('titi', d))
	.catch((e) => console.error('tutu', e));
tutu.instanceDownload.base?.on('data', (d) => {
	console.log('plip', d);
});
tutu.instanceDownload.default.on('data', (d) => {
	console.log('testing', d);
});

/*
import type { statFile } from 'misc/download';
const test = new resourcepack({
	app: 'C:\\Users\\Clement\\Desktop\\MAPCRAFT\\software\\dist',
	appData: 'C:\\Users\\Clement\\AppData\\Roaming\\Electron\\appdata',
	date: '2022_11_21T14_26_44_313Z',
	game: 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft',
	log: 'C:\\Users\\Clement\\AppData\\Roaming\\Electron\\logs',
	resource: 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft\\resourcepacks',
	save: 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft\\saves',
	temp: 'C:\\Users\\Clement\\AppData\\Local\\Temp',
} as envInterface, '1.19', 'test');

test.install()
	.then((d) => {
		console.log(d);
	})
	.catch((e) => {
		console.log(e);
	});
test.instanceDownload.archive.on('data', (e: statFile) => {
	process.stdout.write(`${e.percent}|`);
});
*/

export {
	minecraft,
	download, formatString,
	engine
};
