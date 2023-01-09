import { pack } from '7zip-min';
import { randomBytes } from 'crypto';
import EventEmitter from 'events';
import { access, cp, mkdir, rm } from 'fs/promises';
import { join, resolve, sep } from 'path';
import resource from './resourcepack';
import data from './datapack';

import type datapack from './datapack';
import type resourcepack from './resourcepack';

export class buildMap extends EventEmitter {
	private __datapack: datapack;
	private __resourcepack: resourcepack;
	private check: {
		base: string,
		generated: string
	};
	private destpath: string;
	private path: {
		datapack: string,
		save: string
	};
	
	constructor(datapack: datapack, resource: resourcepack) {
		super();

		this.__datapack = datapack;
		this.__resourcepack = resource;
		this.check = {
			base: `datapacks${sep}mapcraft`,
			generated: `datapacks${sep}mapcraft-data`
		};
		this.destpath = resolve(datapack.env.temp, `mapcraft_${randomBytes(16).toString('hex').slice(0, 16)}`); // this.path to result
		this.path = {
			datapack: resolve(this.destpath, 'datapacks'), // this.path to datapack destination dir
			save: resolve(datapack.env.save, datapack.name) // this.path to save dir
		};
	}

	private createResourceZip (pathToDir: string, pathToDest: string): Promise<void> {
		return new Promise((res, rej) => {
			pack(join(pathToDir, '*'), pathToDest, (err) => {
				if (err)
					rej(err);
				res();
			});
		});
	}

	async start(): Promise<string> {
		this.emit('change', 'create temp directory');
		await mkdir(this.destpath);

		this.emit('change', 'copy to temp directory');
		await cp(
			this.path.save,
			this.destpath,
			{
				dereference: true,
				recursive: true,
				filter: (source) => {
					const isMapcraft = source.includes(this.check.base);
					const isMapcraftData = source.includes(this.check.generated);
					const isResource = source.includes('resources.zip');

					return (!isMapcraft && !isMapcraftData && !isResource);
				}
			}
		);
		
		this.emit('change', 'create datapack directory in temp');
		await access(this.path.datapack)
			.catch(async () => await mkdir(this.path.datapack, { recursive: true }));
		
		// Build resources.zip
		this.emit('change', 'build resources pack');
		const resourcepackPath = await this.__resourcepack.build();
		await this.createResourceZip(resourcepackPath, resolve(this.destpath, 'resources.zip'));

		// Build datapack
		this.emit('change', 'build data pack');
		const datapackPath = await this.__datapack.build();
		await cp(datapackPath, resolve(this.path.datapack, 'mapcraft'), { dereference: true, recursive: true });
		const mapcraftDataPath = resolve(this.path.save, 'datapacks', 'mapcraft-data');
		await access(mapcraftDataPath)
			.then(async () => await cp(mapcraftDataPath, resolve(this.path.datapack, 'mapcraft-data'), { dereference: true, recursive: true }));

		// Clean dirty dir
		this.emit('change', 'clean temp resources pack and data pack');
		const mapZip = resolve(this.path.save, 'map.zip');
		await Promise.all([
			rm(datapackPath, { force: true, recursive: true }),
			rm(resourcepackPath, { force: true, recursive: true }),
			this.createResourceZip(this.destpath, mapZip)
		]);

		this.emit('change', 'clean temp directory');
		await rm(this.destpath, { force: true, recursive: true });

		this.emit('change', 'build finish');
		return mapZip;
	}
}

export default {
	data,
	resource
};
