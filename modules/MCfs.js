const fs = require('fs');

class MCfs
{
	/**
	 * Add a line at the end of the file
	 * @param {String} File File path
	 * @param {String} Line Line appended to file
	 */
	static AddLine(File, Line)
	{
		fs.appendFile(File, Line, (err) =>
		{
			if (err)
				throw new Error(err);
		});
	}

	/**
	 * Modify the line at the first occurrence find, add new line at the end of file if not exist if `AddIsNotExit` set to true
	 * @param {String} File File path
	 * @param {String} Occurence Search string
	 * @param {String} NewLine Line to record
	 * @param {Boolean} AddIfNotExit Set to true if the line must be added at the end of the file if it does not exist
	 */
	static async ModifyLine(File, Occurence, NewLine = undefined, AddIfNotExit = false)
	{
		let LineNumber = 0;
		const regex = new RegExp(`(${Occurence})\\b`, 's');
		fs.readFile(File, (err, data) =>
		{
			if (err)
				throw new Error(err);
			const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
			arr.forEach((element) =>
			{
				if (element.match(regex))
				{
					if (NewLine)
						arr.splice(LineNumber, 1, NewLine);
					else
						arr.splice(LineNumber, 1);
					fs.writeFile(File, arr.join('\n'), (errWrite) =>
					{
						if (errWrite)
							throw new Error(errWrite);
					});
					return;
				}
				LineNumber++;
			});
			if (AddIfNotExit)
				MCfs.AddLine(File, `${NewLine}\n`);
		});
	}

	/**
	 * Delete the line on which the first occurrence is found
	 * @param {String} File File path
	 * @param {String} Occurence Search string
	 */
	static DeleteLine(File, Occurence)
	{
		this.ModifyLine(File, Occurence, '');
	}
}

module.exports = MCfs;
