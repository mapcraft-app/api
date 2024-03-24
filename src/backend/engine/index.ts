import { randomBytes } from 'crypto';
import EventEmitter from 'events';
import { access, cp, mkdir, rm } from 'fs/promises';
import { join, resolve, sep } from 'path';
import sevenZip from '@/backend/7zip';
import resourcepack from '@/backend/engine/resourcepack';
import datapack from '@/backend/engine/datapack';

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
	private sevenZip: sevenZip;
	
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
		this.sevenZip = new sevenZip();
	}

	private createResourceZip (pathToDir: string, pathToDest: string) {
		return this.sevenZip.pack(join(pathToDir, '*'), pathToDest);
	}

	async start(): Promise<string> {
		const mapZip = resolve(this.path.save, 'map.zip');
		await access(mapZip)
			.then(() => rm(mapZip, { force: true }))
			.catch(() => { /* make nothing */ });

		this.emit('change', '1'); // create temp directory
		await mkdir(this.destpath);

		this.emit('change', '2'); // copy to temp directory
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
		
		this.emit('change', '3'); // create datapack directory in temp
		await access(this.path.datapack)
			.catch(async () => await mkdir(this.path.datapack, { recursive: true }));
		
		// Build resources.zip
		this.emit('change', '4'); // build resources pack
		const resourcepackPath = await this.__resourcepack.build();
		await this.createResourceZip(resourcepackPath, resolve(this.destpath, 'resources.zip'));

		// Build datapack
		this.emit('change', '5'); // build data pack
		const datapackPath = await this.__datapack.build();
		await cp(datapackPath, resolve(this.path.datapack, 'mapcraft'), { dereference: true, recursive: true });
		const mapcraftDataPath = resolve(this.path.save, 'datapacks', 'mapcraft-data');
		await access(mapcraftDataPath)
			.then(async () => await cp(mapcraftDataPath, resolve(this.path.datapack, 'mapcraft-data'), { dereference: true, recursive: true }));

		// Clean dirty dir
		this.emit('change', '6'); // clean temp resources pack and data pack
		await Promise.all([
			rm(datapackPath, { force: true, recursive: true }),
			rm(resourcepackPath, { force: true, recursive: true }),
			this.createResourceZip(this.destpath, mapZip)
		]);

		this.emit('change', '7'); // clean temp directory
		await rm(this.destpath, { force: true, recursive: true });

		this.emit('change', '8'); // build finish
		return mapZip;
	}
}

export default {
	datapack,
	resourcepack
};
