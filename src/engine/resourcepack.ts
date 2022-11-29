import { accessSync } from 'fs';
import { mkdir, rm } from 'fs/promises';
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

	private async fetchRelease(): Promise<void> {
		const __path = resolve(this.env.resource, 'mapcraft');
		try {
			accessSync(__path);
		} catch (___) {
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
	}

	async install(): Promise<{ archive: string }> {
		try {
			accessSync(this._path.temp);
		} catch (___) {
			await mkdir(this._path.temp);
		}
		await this.fetchRelease();
		return new Promise((res, rej) => {
			this.instanceDownload.default.get()
				.then(() => {
					unpack(this._path.archive, this.path.resourcepack, (err) => {
						if (err)
							rej(err);
						res({ archive: this._path.archive });
					});
				});
		});
	}

	build(): Promise<string> {
		return this._build(this.path.resourcepack);
	}

	check(): boolean {
		return this._check(this.path.resourcepack);
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
