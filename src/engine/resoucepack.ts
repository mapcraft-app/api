import { constants } from 'fs';
import { access, open, mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { unpack } from '7zip-min';

import { envInterface } from './interface';

export default class {
	path: string;
	name: string;

	constructor(name: string, env: envInterface) {
		this.name = name;
		this.path = resolve(env.RESOURCE_GAME, name);


		/*fullArchive(resolve(env.GAME, 'versions', '1.19.2', '1.19.2.jar'), resolve(__dirname, 'toto'))
			.then(() => {
				console.log('extract to', resolve(__dirname, 'toto'));
			})
			.catch((e) => {
				console.error(e);
			});*/

		/*open(resolve(process.env.GAME, 'versions', '1.19.2', '1.19.2.jar'))
			.then((d) => {
				console.log(d);
			})
			.catch((e) => {
				console.error(e);
			});
			*/
		/*
		access(resolve(this.path, 'pack.mcmeta'), constants.F_OK | constants.R_OK | constants.W_OK | constants.W_OK)
			.then(async () => {
				console.log('one');
			})
			.catch(async () => {
				await mkdir(this.path);
				// await this.createBase();
				open(resolve(process.env.GAME, 'version', '1.19.2', '1.19.2.jar'))
					.then((d) => {
						console.log(d);
					})
					.catch((e) => {
						console.error(e);
					});
			});
		*/
	}

	private async createBase() {
		const dirStruct = [
			'icons',
			'mapcraft',
			'mapcraft/sounds',
			'mapcraft/sounds/mapcraft',
			'minecraft',
			'minecraft/blockstates',
			'minecraft/font',
			'minecraft/icons',
			'minecraft/lang',
			'minecraft/models',
			'minecraft/models/block',
			'minecraft/models/item',
			'minecraft/sounds',
			'minecraft/shaders',
			'minecraft/shaders/post',
			'minecraft/shaders/program',
			'minecraft/texts',
			'minecraft/textures',
		];

		try {
			for (const el of dirStruct)
				await mkdir(resolve(this.path, el));

			await writeFile(resolve(this.path, 'pack.mcmeta'), JSON.stringify({
				pack: {
					pack_format: 0,
					description: `${this.name} resource pack`
				}
			}, null, 2));
			await writeFile(resolve(this.path, 'mapcraft', 'sounds.json'), JSON.stringify({
				blank: {
					category: 'master',
					id: 1,
					sounds: [
						{
							'name': 'mapcraft:mapcraft/blank'
						}
					],
					subtitle: 'blank sound'
				}
			}, null, 2));
		} catch (e) {
			console.log(e);
		}
	}
}
