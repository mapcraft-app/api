import { randomBytes } from 'crypto';
import { accessSync } from 'fs';
import { cp, mkdir, readFile, rm } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { semverCompare } from '@/minecraft/version';
import fetch from '@/misc/fetch';
import download from '@/backend/download';
import engine from '@/backend/engine/base';
import extractGameData from '@/backend/engine/extractGameData';
import type { envInterface, minecraftVersion } from '@/types';

export default class extends engine {
	private baseUrl: string;
	private resourcePackBase: string;
	private _path: {
		base: string,
		temp: string
	};
	private release: { description: string, url: string, version: string };
	public instanceDownload: download;
	public instanceExtract: extractGameData;

	constructor(
		env: envInterface,
		name: string,
		version: minecraftVersion
	) {
		super(env, version, name);

		const __dirname = dirname(fileURLToPath(import.meta.url));
		const randomId = randomBytes(16).toString('hex').slice(0, 16);
		this.baseUrl = (process.env.DEV as any === true)
			? 'http://localhost:3000'
			: 'https://api.mapcraft.app';
		this.resourcePackBase = resolve(__dirname, 'assets');
		this._path = {
			base: resolve(this.env.temp, `mapcraft_${randomId}`, 'base.zip'),
			temp: resolve(this.env.temp, `mapcraft_${randomId}`)
		};
		this.release = { description: '', url: '', version: '' };
		this.instanceDownload = new download('', this._path.base);
		this.instanceExtract = new extractGameData(this.env, this.version, this.name);
	}

	/**
	 * Install custom resource pack with extraction of data
	 */
	private async installBaseResource(): Promise<void> {
		this.instanceExtract.checkIfMinecraftVersionIsInstalled();
		return this.instanceExtract.extract();
	}

	/**
	 * Install mapcraft datapack
	 */
	private async installDefaultResource(__path: string): Promise<void> {
		try {
			accessSync(this._path.temp);
		} catch (___) {
			await mkdir(this._path.temp);
		}
		const backgroundDir = resolve(__path, 'assets', 'minecraft', 'textures', 'gui', 'title', 'background');

		await rm(this._path.base, { recursive: true, force: true });
		await rm(__path, { recursive: true, force: true });
		const data = (await fetch(`${this.baseUrl}/software/resourcepack/${this.version}`)).json();
		if (!data.releases || !data.releases.length)
			throw new Error(`No resource pack exist in version ${this.version}`);
		this.release = data.releases[0] as { description: string, url: string, version: string };
		this.instanceDownload.url = this.release.url;
		await this.instanceDownload.get();
		await this.unpackData(this._path.base, __path);
		if (semverCompare(this.version, '1.21') >= 0) {
			await rm(backgroundDir, { recursive: true, force: true });
			await mkdir(backgroundDir, { recursive: true });
			await cp(resolve(this.resourcePackBase, 'panorama_overlay.png'), resolve(backgroundDir, 'panorama_overlay.png'), { force: true });
		}
	}

	async install(): Promise<Record<string, any>> {
		await this.installDefaultResource(resolve(this.env.resource, `mapcraft_${this.version}`));
		await this.installBaseResource();
		return this._generateHashMap(this.instanceExtract.gamePath.resourcepack, true);
	}

	async update(): Promise<void> {
		const __path_default = resolve(this.env.resource, `mapcraft_${this.version}`);
		
		try {
			accessSync(this.path.resourcepack);
			const currentHash = JSON.parse(await readFile(resolve(this.path.resourcepack, 'hash.json'), { encoding: 'utf-8' })) as Record<any, any>;
			if (currentHash.__mapcraft_info__.version !== this.version)
				throw new Error();
		} catch (___) {
			await this.installBaseResource();
		}
		try {
			accessSync(__path_default);
			const localVersion = JSON.parse(await readFile(resolve(__path_default, 'pack.mcmeta'), { encoding: 'utf-8' })).mapcraft.version as string;
			const remoteVersion = (await fetch(`${this.baseUrl}/software/resourcepack/${this.version}`)).json().releases[0].version as string;
			if (localVersion !== remoteVersion)
				throw new Error();
		} catch (___) {
			await this.installDefaultResource(__path_default);
		}
	}

	build(): Promise<string> {
		return this._build(
			this.path.resourcepack,
			resolve(this.env.temp, `mapcraft_${randomBytes(16).toString('hex').slice(0, 16)}`)
		);
	}

	check(): boolean {
		const base = this._check(resolve(this.env.resource, `mapcraft_${this.version}`));
		const _default = this._check(this.path.resourcepack);
		return (base === true && _default === true);
	}

	clean(): Promise<void[]> {
		return Promise.all([
			rm(this.path.resourcepack, { force: true, recursive: true }),
			rm(this._path.temp, { force: true, recursive: true })
		]);
	}

	hashMap(write = false): Promise<Record<string, any>> {
		return this._generateHashMap(this.path.resourcepack, write);
	}
}
