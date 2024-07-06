import { spawn } from 'child_process';
import { join, resolve as pathResolve } from 'path';
//import { path7za } from '7zip-bin';

/**
 * Pack or unpack archive
 */
export default class sevenZip {
	private percentReg = /(\d+)%/g;
	public percent: number;

	constructor() {
		this.percent = 0;
	}

	private isStat(chunk: string) {
		const __data__ = this.percentReg.exec(chunk);
		
		if (__data__ && __data__[1])
			return Number(__data__[1]);
		return null;
	}

	private parseListOutput(output: string) {
		if (!output.length)
			return [];
		
		const res = [];
		const LIST_MAP: Record<string, string> = {
			'Path': 'name',
			'Size': 'size',
			'Packed Size': 'compressed',
			'Attributes': 'attr',
			'Modified': 'dateTime',
			'CRC': 'crc',
			'Method': 'method',
			'Block': 'block',
			'Encrypted': 'encrypted',
		};
		const items = output
			.replace(/(\r\n|\n|\r)/gm, '\n')
			.split(/^\s*$/m);

		if (!items.length)
			return [];

		for (const item of items) {
			if (!item.length)
				continue;
			const obj: Record<string, string> = {};
			const lines = item.split('\n');

			if (!lines.length)
				continue;
	
			for (const line of lines) {
				const data = line.split(' = ');
				if (data.length !== 2)
					continue;

				const name = data[0].trim();
				const val = data[1].trim();
				if (LIST_MAP[name]) {
					if (LIST_MAP[name] === 'dateTime') {
						const dtArr = val.split(' ');
						if (dtArr.length !== 2)
							continue;
						obj['date'] = dtArr[0];
						obj['time'] = dtArr[1];
					} else 
						obj[LIST_MAP[name]] = val;
                
				}
			}
			if (Object.keys(obj).length)
				res.push(obj);
		}
		return res;
	}

	/**
	 * Pack file or folder to archive.
	 * @param pathToSrc path to file or folder you want to compress.
	 * @param pathToDest path to archive you want to create.
	 */
	pack(pathToSrc: string, pathToDest: string): Promise<Record<string, string>[]> {
		return this.cmd([ 'a', pathToDest, pathToSrc ], true, true);
	}

	/**
	 * Unpack file or folder to archive.
	 * @param pathToSrc path to file or folder you want to compress.
	 * @param pathToDest path to archive you want to create.
	 */
	unpack(pathToArchive: string, pathToDir: string | undefined = undefined): Promise<Record<string, string>[]> {
		return (!pathToDir)
			? this.cmd([ 'x', pathToArchive ], true, true)
			: this.cmd([ 'x', pathToArchive, `-o${pathToDir}` ], true, true);
	}

	/**
	 * Get an array with compressed file contents.
	 * @param pathToSrc path to file its content you want to list.
	 */
	list(pathToSrc: string): Promise<Record<string, string>[]> {
		return this.cmd([ 'l', '-slt', '-ba', pathToSrc ]);
	}

	/**
	 * Run 7zip with parameters specified in `args`.
	 * @param args array of parameter. Each array item is one parameter.
	 * @param genStat generate stat
	 * @param yesForAll response to all question(s) with yes
	 * @param isElectron specify if is electron context
	 */
	cmd(args: string[], genStat = true, yesForAll = false): Promise<Record<string, string>[]> {
		const __args = args;
		const stdio: { out: string[], err: string[] } = {
			out: [],
			err: []
		};
		if (genStat)
			__args.push('-bsp1');
		if (yesForAll)
			__args.push('-y');
		this.percent = 0;
		return new Promise(async (resolve, reject) => {
			const seven: { path7za: string, path7x: string } = await import(
				(process.env.PACKAGED && process.env.PACKAGED === 'true')
					? 'file://' + pathResolve('.', 'resources', 'app.asar.unpacked', 'node_modules', 'mapcraft-api', 'node_modules', '7zip-bin', 'index.js')
					: 'file://' + join('7zip-bin', 'index.js')
				)
					.then((d) => d.default);
			const sevenZip = spawn(seven.path7za, __args, { windowsHide: true });
			sevenZip
				.on('error', (e: unknown) => reject(e))
				.on('exit', (code: string) => {
					if (code) 
						reject(`7-zip exited with code ${code}\n${stdio.err.join('')}`);
					this.percent = 100;
					resolve(this.parseListOutput(stdio.out.join('')));
				});
			sevenZip.stdout.on('data', (chunk: Buffer) => {
				const tempChunk = chunk.toString();
				const tempStat = this.isStat(tempChunk);
				if (tempStat)
					this.percent = tempStat;
				stdio.out.push(tempChunk);
			});
			sevenZip.stderr.on('data', (chunk: Buffer) => {
				stdio.err.push(chunk.toString());
			});
		});
	}
}
