import { existsSync, readFileSync, writeFile } from 'fs';
import { basename, extname } from 'path';

class editor {
	public state: {
		isEdit: boolean;
		link: string;
		filename: string;
		extension: string;
	};

	constructor() {
		this.state = {
			isEdit: false,
			link: '',
			filename: '',
			extension: '',
		};
	}

	openFile(link: string): { filename: string, extension: string, data: string } {
		this.state.isEdit = true;
		this.state.link = link;
		this.state.filename = basename(link, extname(link));
		this.state.extension = extname(link).slice(1);
		if (existsSync(this.state.link)) {
			const _data = readFileSync(this.state.link, 'utf-8');
			return ({
				filename: this.state.filename,
				extension: this.state.extension,
				data: _data,
			});
		}
		throw new Error('Editor: file no exist');
	}

	saveFile(data: string): void {
		if (this.state.isEdit) {
			writeFile(this.state.link, data, (err) => {
				if (err)
					throw new Error('Editor:', err);
				this.closeFile();
			});
		}
	}

	closeFile(): void {
		this.state.isEdit = false;
	}
}

export default new editor();
