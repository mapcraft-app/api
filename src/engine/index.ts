import { pack } from '7zip-min';
import { cp, mkdir, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import { join, resolve, sep } from 'path';
import resource from './resourcepack';
import data from './datapack';

import type datapack from './datapack';
import resourcepack from './resourcepack';

export async function build(datapack: datapack, resource: resourcepack): Promise<void> {
	const checkBase = `datapacks${sep}mapcraft`;
	const checkGenerate = `datapacks${sep}mapcraft-data`;
	const destPath = await mkdtemp(resolve(tmpdir(), 'mapcraft_'), 'utf-8');
	const path = {
		datapack: resolve(destPath, 'datapacks'), // path to datapack destination dir
		resourcepack: resolve(destPath, 'resources.zip'), // path to resource destination dir
		result: destPath, // path to destination dir
		save: resolve(datapack.env.save, datapack.name) // path to save dir
	};
	const createResourceZip = (pathToDir: string): Promise<void> => {
		return new Promise((res, rej) => {
			pack(join(pathToDir, '*'), path.resourcepack, (err) => {
				if (err)
					rej(err);
				res();
			});
		});
	};

	await mkdir(path.datapack);
	await cp(
		path.save,
		path.result,
		{
			dereference: true,
			recursive: true,
			filter: (source) => {
				const one = source.includes(checkBase);
				const two = source.includes(checkGenerate);
				return (one === false && two === false);
			}
		}
	);

	const pathToResourceBuild = await resource.build();
	await createResourceZip(pathToResourceBuild);

	console.log(pathToResourceBuild);
}

export default {
	resource,
	data
};
