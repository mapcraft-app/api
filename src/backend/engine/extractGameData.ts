import { accessSync, constants } from 'fs';
import { cp, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import base from '@/backend/engine/base';
import versions from '@/minecraft/version';
import extractArchive from '@/backend/7zip';
import type { envInterface, minecraftVersion } from '@/types';

type json = {
	path: string;
	version: string;
};

type hash = {
	hash: string;
	size: number;
};

export default class extends base {
	private splitVersion: string[];
	private resourcePackBase: string;
	public gamePath: {
		textures: json | undefined,
		sounds: string,
		soundsJson: string,
		resourcepack: string
	};
	private instanceExtract: extractArchive;
	public stat: { base: number, textures: number, sounds: number, total: number };
	
	constructor(env: envInterface, version: minecraftVersion, name: string) {
		super(env, version, name);
		
		const tempVersion = versions.find((e) => e.version === version);
		if (!tempVersion)
			throw new Error(`Version ${version} not exist`);
		
		this.splitVersion = version.split('.').filter((e) => e.length);
		this.resourcePackBase = resolve(__dirname, 'assets');
		this.gamePath = {
			textures: this.isExist(resolve(this.env.game, 'versions')),
			sounds: resolve(this.env.game, 'assets', 'objects'),
			soundsJson: resolve(this.env.game, 'assets', 'indexes', tempVersion.indexes),
			resourcepack: resolve(this.env.resource, this.name)
		};
		this.instanceExtract = new extractArchive();
		this.stat = { base: 0, textures: 0, sounds: 0, total: 0 };
	}

	private isExist(basePath: string, extension: string | undefined = undefined): json | undefined {
		for (let i = this.splitVersion.length; i > 0; i--) {
			const __version = () => {
				const ret = [];
				for (let x = 0; x < i; x++)
					ret.push(this.splitVersion[x]);
				return ret.join('.');
			};
			const testVersion = __version();
			const testPath = (extension)
				? resolve(basePath, `${testVersion}${extension}`)
				: resolve(basePath, testVersion);
			
			try {
				accessSync(testPath, constants.R_OK);
				return { path: testPath, version: testVersion };
			} catch {
				/* make nothing */
			}
		}
		return undefined;
	}

	private calcStat(val: number, type: 'base' | 'textures' | 'sounds') {
		this.stat[type] = val;
		this.stat.total = Math.round(((this.stat.base + this.stat.textures + this.stat.sounds) / 300) * 100);
	}

	private async installBase() {
		const pathOfPack = this.isExist(this.resourcePackBase, '.zip');
		if (!pathOfPack)
			throw new Error('Extract game data - Path of base resource pack is incorrect');
		const interval = setInterval(() => this.calcStat(this.instanceExtract.percent, 'base'), 10);
		await this.instanceExtract.unpack(pathOfPack.path, this.gamePath.resourcepack);
		clearInterval(interval);
		this.stat.base = 100;
	}

	private async textures() {
		if (!this.gamePath.textures)
			throw new Error('Extract game data - Path of textures is incorrect');
		const interval = setInterval(() => this.calcStat(this.instanceExtract.percent, 'textures'), 10);
		await this.instanceExtract.cmd(
			[
				'x',
				resolve(this.gamePath.textures.path, `${this.gamePath.textures.version}.jar`),
				`-o${this.path.resourcepack}`,
				'assets/minecraft' ,
				'-x!*.class'
			]
		);
		clearInterval(interval);
	}

	private async sounds() {
		const cpSound = async (objects: Record<string, hash>, id: string) => {
			const hash = objects[id].hash;
			await cp(
				resolve(this.gamePath.sounds, hash.substring(0, 2), hash),
				resolve(this.gamePath.resourcepack, 'assets', 'minecraft', id.replace('minecraft/', '')),
				{ force: true }
			);
		};
		let counts = 0, objectsLength = 0;

		const interval = setInterval(() => {
			const temp = Math.round((counts++ / objectsLength) * 100);
			this.calcStat((temp > 100.0)
				? 100
				: temp, 'sounds');
		}, 10);
		
		const objects: Record<string, hash> = JSON.parse(await readFile(this.gamePath.soundsJson, { encoding: 'utf-8', flag: 'r' })).objects;
		objectsLength = Object.keys(objects).length;
		for (const id in objects) {
			if (
				/sounds.json/.test(id) ||
					(
						/\/(?:sounds)\//.test(id) &&
						/\/(?:ambient|block|damage|dig|enchant|entity|event|fire|fireworks|item|liquid|minecart|mob|music|note|portal|random|records|step|title|ui)\//.test(id)
					)
			)
				await cpSound(objects, id);
		}
		clearInterval(interval);
	}

	private async genMcMeta() {
		const configOfVersion = versions.find((e) => e.version === this.version);
		if (configOfVersion) {
			await writeFile(
				resolve(this.gamePath.resourcepack, 'pack.mcmeta'),
				JSON.stringify({
					info: {
						creationDate: new Date().toISOString(),
						mapcraft: 'Made with Mapcraft - https://mapcraft.app'
					},
					pack: {
						description: `Mapcraft resource pack of ${this.name}`,
						pack_format: configOfVersion.resourcepack
					}
				}, null, 2)
			);
		}
	}

	public checkIfMinecraftVersionIsInstalled(): void {
		if (!this.gamePath.textures)
			throw new Error(`Extract game data - version ${this.version} not exist in ${resolve(this.env.game, 'versions')}`);
		if (!this.gamePath.soundsJson)
			throw new Error(`Extract game data - version ${this.version} not exist in ${resolve(this.env.game, 'assets', 'indexes')}`);
	}

	public async extract(): Promise<void> {
		await this.installBase();
		await this.genMcMeta();
		await this.textures();
		await this.sounds();
		await this._generateHashMap(this.gamePath.resourcepack);
	}
}
