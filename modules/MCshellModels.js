/* eslint-disable arrow-body-style */

exports.trigger = {
	name: 'trigger',
	builtin: true,
	function: (args) =>
	{
		return ({
			Command: args[0],
			Player: args[1],
			Coordinates: {
				P1: [args[2], args[3], args[4]],
				P2: [args[5], args[6], args[7]],
			},
		});
	},
};

exports.cutscene = {
	name: 'cutscene',
	builtin: true,
	function: (args) =>
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
	},
};

exports.option = {
	name: 'option',
	builtin: true,
	function: (args) =>
	{
		return ({
			Command: args[0],
			Player: args[1],
			Option: args[2],
		});
	},
};
