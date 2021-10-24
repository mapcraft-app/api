const fs = require('fs');
const path = require('path');

class MCeditor
{
	/**
	 * Initialize the file edition in the integrated ide
	 */
	constructor()
	{
		this.state = {
			isEdit: false,
			link: '',
			fileName: '',
			extension: '',
		};
	}

	/**
	 * Open file and return data
	 * @param {String} link Path of file
	 * @returns {JSON} Return `fileName`, `extension` and `data` in JSON format
	 */
	OpenFile(link)
	{
		this.state.isEdit = true;
		this.state.link = link;
		this.state.fileName = path.basename(link, path.extname(link));
		this.state.extension = path.extname(link).slice(1);
		if (fs.existsSync(this.state.link))
		{
			const _data = fs.readFileSync(this.state.link, 'utf-8');
			return ({
				fileName: this.state.fileName,
				extension: this.state.extension,
				data: _data,
			});
		}
		throw new Error('Editor: file no exist');
	}

	/**
	 * Overwrite the previously opened file and save the file with new data
	 * @param {String} data Data to be saved on the file
	 */
	SaveFile(data)
	{
		if (this.state.isEdit)
			fs.writeFile(this.state.link, data, (err) =>
			{
				if (err)
					throw new Error('Editor:', err);
				this.CloseFile();
			});
	}

	/**
	 * Close file from edition
	 */
	CloseFile()
	{
		this.state.isEdit = false;
	}
}

module.exports = new MCeditor();
