const fs = require('fs');
const path = require('path');
const process = require('process');

const AppName = 'Mapcraft';
if (!process.env.APPDATA)
	process.env.APPDATA = (process.platform === 'darwin' ? `${process.env.HOME}/Library/Preferences` : `${process.env.HOME}/.local/share`);

module.exports = () =>
{
	const appPath = path.join(process.env.APPDATA, AppName, 'plugins');
	const componentPath = path.join(appPath, 'components.json');
	fs.mkdir(appPath, { recursive: true }, (err) =>
	{
		if (err)
		{
			console.log(`\x1b[31m${err.message}`);
			process.exit(1);
		}
	});
	fs.access(componentPath, (err) =>
	{
		if (err)
			fs.writeFile(componentPath, '[]', { encoding: 'utf-8' }, (err2) =>
			{
				if (err2)
					throw new Error(err2);
			});
	});
	return appPath;
};
