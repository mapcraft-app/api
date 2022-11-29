import { accessSync } from 'fs';
import { mkdir, readFile, rm } from 'fs/promises';
import { resolve } from 'path';
import { unpack } from '7zip-min';
import download from 'misc/download';
import fetch from 'misc/fetch';

import { envInterface } from './interface';
import engine from './base';

export default class extends engine {
	private baseUrl: string;
	private release: { description: string, url: string, version: string } | undefined;
	private _path: {
		archive: string,
		base: string,
		temp: string
	};

	public instanceDownload: { base: download | undefined, default: download };

	constructor(
		env: envInterface,
		name: string,
		version: '1.17' | '1.18' | '1.19' = '1.19'
	) {
		super(env, version, name);

		this.baseUrl = (process.env.DEV)
			? 'http://localhost:3000'
			: 'https://api.mapcraft.app';

		this._path = {
			archive: resolve(this.env.temp, `mapcraft_${version}_rsp`, 'pack.7z'),
			base: resolve(this.env.temp, `mapcraft_${version}_rsp`, 'base.zip'),
			temp: resolve(this.env.temp, `mapcraft_${version}_rsp`)
		};

		this.instanceDownload = {
			base: undefined,
			default: new download(`${this.baseUrl}/files/minecraft/${this.version}/resourcepack/pack.7z`, this._path.archive)
		};
	}

	private async installBaseResource(): Promise<void> {
		try {
			accessSync(this._path.temp);
		} catch (___) {
			await mkdir(this._path.temp);
		}
		await rm(this._path.archive, { recursive: true, force: true });
		await rm(this.path.resourcepack, { recursive: true, force: true });
		this.instanceDownload.default.get()
			.then(() => {
				unpack(this._path.archive, this.path.resourcepack, (err) => {
					if (err)
						throw new Error(err.message);
				});
			});
	}

	private async installDefaultResource(__path: string): Promise<void> {
		try {
			accessSync(this._path.temp);
		} catch (___) {
			await mkdir(this._path.temp);
		}
		await rm(this._path.base, { recursive: true, force: true });
		await rm(__path, { recursive: true, force: true });
		await fetch(`${this.baseUrl}/software/resourcepack/${this.version}`)
			.then((d) => d.json())
			.then((d) => {
				this.release = d.releases[0] as { description: string, url: string, version: string };
				this.instanceDownload.base = new download(this.release.url, this._path.base);
				this.instanceDownload.base.get()
					.then(() => {
						unpack(this._path.base, __path, (err) => {
							if (err)
								throw new Error(err.message);
						});
					});
			});
	}

	async install(): Promise<[void, void]> {
		try {
			accessSync(this._path.temp);
		} catch (___) {
			await mkdir(this._path.temp);
		}
		return Promise.all([
			this.installDefaultResource(resolve(this.env.resource, 'mapcraft')),
			this.installBaseResource()
		]);
	}

	async update(): Promise<void> {
		// default mapcraft resource pack
		const __path_default = resolve(this.env.resource, 'mapcraft');
		try {
			accessSync(__path_default);
			const localVersion = JSON.parse(await readFile(resolve(__path_default, 'pack.mcmeta'), { encoding: 'utf-8' })).mapcraft.version as string;
			const remoteVersion = (await fetch(`${this.baseUrl}/software/resourcepack/${this.version}`)).json().releases[0].version as string;
			if (localVersion !== remoteVersion)
				throw new Error('update default mapcraft resource pack');
		} catch (___) {
			await this.installDefaultResource(__path_default);
		}

		// base resource pack
		try {
			accessSync(this.path.resourcepack);
			await fetch(`${this.baseUrl}/files/minecraft/${this.version}/resourcepack/hash.json`)
				.then((d) => d.json())
				.then(async (newHash) => {
					const currentHash = JSON.parse(await readFile(resolve(this.path.resourcepack, 'hash.json'), { encoding: 'utf-8' }));
					if (Object.keys(this.compareHash(newHash, currentHash)).length)
						throw new Error('hash is change');
				});
		} catch (___) {
			await this.installBaseResource();
		}
	}

	build(): Promise<string> {
		return this._build(this.path.resourcepack);
	}

	check(): boolean {
		const base = this._check(resolve(this.env.resource, 'mapcraft'));
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
