const COMMAND = '/mapcraft';
const LENGTH = COMMAND.length;

class MCshell
{
	/**
	 * Parse a line and return data if the program exists
	 * @param {String} line Line to be parsed
	 * @returns {JSON} Preformed data, or null if error
	 */
	static parse(line)
	{
		let ret = null;
		const check = line.indexOf(COMMAND);
		if (check !== -1)
		{
			const args = line.substring(check + LENGTH).trim().split(' ');
			switch (args[0])
			{
				case 'trigger':
					ret = this._trigger(args);
					break;
				case 'cutscene':
					ret = this._cutscene(args);
					break;
				case 'option':
					ret = this._option(args);
					break;
				default:
					break;
			}
		}
		return (ret);
	}

	/**
	 * Trigger built-in
	 * @private
	 */
	static _trigger(args)
	{
		return ({
			Command: args[0],
			Player: args[1],
			Coordinates: {
				P1: [args[2], args[3], args[4]],
				P2: [args[5], args[6], args[7]],
			},
		});
	}

	/**
	 * Cutscene built-in
	 * @private
	 */
	static _cutscene(args)
	{
		const stof = (str) => parseFloat(parseFloat(str.slice(0, -1)).toFixed(1));

		switch (args[2])
		{
			case 'create':
				return ({
					Command: args[0],
					Player: args[1],
					Type: args[2],
				});
			case 'add-point':
				parseFloat(args[3].slice(0, -1));
				return ({
					NoNotification: true,
					Command: args[0],
					Player: args[1],
					Type: args[2],
					Coordinates: {
						Point: [stof(args[3]), stof(args[4]), stof(args[5])],
						Rotation: [stof(args[6]), stof(args[7])],
					},
				});
			case 'delete-point':
				return ({
					NoNotification: true,
					Command: args[0],
					Player: args[1],
					Type: args[2],
					Coordinates: { Point: [stof(args[3]), stof(args[4]), stof(args[5])] },
				});
			default:
				return ({ Command: undefined });
		}
	}

	/**
	 * Option built-in
	 * @private
	 */
	static _option(args)
	{
		return ({
			Command: args[0],
			Player: args[1],
			Option: args[2],
		});
	}
}

module.exports = MCshell;
