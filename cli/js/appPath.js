const fs = require('fs');
const path = require('path');
const process = require('process');

const AppName = 'Mapcraft';
if (!process.env.APPDATA)
	process.env.APPDATA = (process.platform === 'darwin' ? `${process.env.HOME}/Library/Preferences` : `${process.env.HOME}/.local/share`);

module.exports = () =>
{
	const appPath = path.join(process.env.APPDATA, AppName, 'plugins');
	fs.mkdir(appPath, { recursive: true }, (err) =>
	{
		if (err)
		{
			console.log(`\x1b[31m${err.message}`);
			process.exit(1);
		}
	});
	return appPath;
};
