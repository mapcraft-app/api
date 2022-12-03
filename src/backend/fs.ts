import { appendFile, readFile, writeFile } from 'fs/promises';

export default class {
	static addLine(file: string, line: string): Promise<void> {
		return appendFile(file, line, { encoding: 'utf-8' });
	}

	static async modifyLine(file: string, occurence: string, newLine: string | undefined = undefined, addIfNotExist: boolean = false): Promise<void> {
		let isFound = false, lineNumber = 0;
		const regex = new RegExp(`(${occurence})\\b`, 's');

		return new Promise((resolve, reject) => {
			readFile(file, { encoding: 'utf-8' })
				.then(async (data) => {
					const lines = data.toString().replace(/\r\n/g, '\n').split('\n');
					for (const line of lines) {
						if (line.match(regex)) {
							isFound = true;
							(newLine)
								? lines.splice(lineNumber, 1, newLine)
								: lines.splice(lineNumber, 1);
							await writeFile(file, lines.join('\n'))
								.then(() => resolve());
						}
						lineNumber++;
					}
					if (addIfNotExist && !isFound)
						await this.addLine(file, `${newLine}\n`);
				})
				.catch((e) => {
					reject(e);
				});
		});
	}

	static removeLine(file: string, occurence: string): Promise<void> {
		return this.modifyLine(file, occurence, undefined);
	}
}
