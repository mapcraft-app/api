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
import engine, { buildMap } from './engine';
/*
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

(async() => {
	const __datapack = new datapack(envTest, 'mapcraft_vue', '1.19');
	const __resourcepack = new resourcepack(envTest, 'mapcraft_vue', '1.19');

	__datapack.instanceDownload?.on('data', (d) => {
		console.log('datapack', d);
	});
	__resourcepack.instanceDownload.default.on('data', (d) => {
		console.log('resource default', d);
	});
	__resourcepack.instanceDownload.base?.on('data', (d) => {
		console.log('resource base', d);
	});

	await __datapack.update().finally(() => console.log('datapack updated'));
	await __resourcepack.update().finally(() => console.log('resource updated'));
	const instance = new buildMap(__datapack, __resourcepack);
	await instance.start();
})();
*/

export {
	minecraft,
	download, formatString,
	engine
};
