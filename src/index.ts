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
import engine, { build } from './engine';

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

/*
test.install()
	.then((d) => console.log('plip', d))
	.catch((e) => console.error('plop', e));
test.instanceDownload?.on('data', (d) => {
	console.log('test', d);
});*/

/*tutu.install()
	.then((d) => console.log('titi', d))
	.catch((e) => console.error('tutu', e));
tutu.instanceDownload.base?.on('data', (d) => {
	console.log('plip', d);
});
tutu.instanceDownload.default.on('data', (d) => {
	console.log('testing', d);
});*/

(async() => {
	const __datapack = new datapack(envTest, 'NewMapcraft', '1.19');
	const __resourcepack = new resourcepack(envTest, 'NewMapcraft', '1.19');

	__datapack.instanceDownload?.on('data', (d) => {
		console.log('datapack', d);
	});
	__resourcepack.instanceDownload.default.on('data', (d) => {
		console.log('resource default', d);
	});
	__resourcepack.instanceDownload.base?.on('data', (d) => {
		console.log('resource base', d);
	});

	await __datapack.update();
	// await __resourcepack.update();
	console.log(await __datapack.build());
	// await build(__datapack, __resourcepack);
	// console.log(await __datapack.build());
	// console.log(await __resourcepack.build());
})();

export {
	minecraft,
	download, formatString,
	engine
};