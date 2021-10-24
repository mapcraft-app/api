const fs = require('fs');

class MCfs
{
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
	 * @param {string} File Path of File
	 * @param {string} Occurence Search string
	 * @param {string} NewLine Line to record
	 * @param {boolean} AddIfNotExit
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
			/* for (const i of arr)
			{
				if (i.match(regex))
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
			}*/
			if (AddIfNotExit)
				MCfs.AddLine(File, `${NewLine}\n`);
		});
	}

	/**
	 * Delete the line on which the first occurrence is found
	 * @param {String} File Path of file
	 * @param {String} Occurence Search string
	 */
	static DeleteLine(File, Occurence)
	{
		this.ModifyLine(File, Occurence, '');
	}
}

module.exports = MCfs;
