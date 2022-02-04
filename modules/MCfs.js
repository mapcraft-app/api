const fs = require('fs');

class MCfs
{
	/**
	 * Add a line at the end of the file
	 * @param {String} file File path
	 * @param {String} line Line appended to file
	 */
	static addLine(file, line)
	{
		fs.appendFile(file, line, (err) =>
		{
			if (err)
				throw new Error(err);
		});
	}

	/**
	 * Modify the line at the first occurrence find, add new line at the end of file if not exist if `AddIsNotExit` set to true
	 * @param {String} file File path
	 * @param {String} occurence Search string
	 * @param {String} newLine Line to record
	 * @param {Boolean} addIfNotExit Set to true if the line must be added at the end of the file if it does not exist
	 */
	static async modifyLine(file, occurence, newLine = undefined, addIfNotExit = false)
	{
		let isFound = false;
		let LineNumber = 0;
		const regex = new RegExp(`(${occurence})\\b`, 's');
		fs.readFile(file, (err, data) =>
		{
			if (err)
				throw new Error(err);
			const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
			arr.forEach((element) =>
			{
				if (element.match(regex))
				{
					isFound = true;
					if (newLine)
						arr.splice(LineNumber, 1, newLine);
					else
						arr.splice(LineNumber, 1);
					fs.writeFile(file, arr.join('\n'), (errWrite) =>
					{
						if (errWrite)
							throw new Error(errWrite);
					});
					return;
				}
				LineNumber++;
			});
			if (addIfNotExit && !isFound)
				MCfs.addLine(file, `${newLine}\n`);
		});
	}

	/**
	 * Delete the line on which the first occurrence is found
	 * @param {String} file File path
	 * @param {String} occurence Search string
	 */
	static deleteLine(file, occurence)
	{
		this.modifyLine(file, occurence, '');
	}
}

module.exports = MCfs;
