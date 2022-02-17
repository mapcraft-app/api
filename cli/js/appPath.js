const fs = require('fs/promises');
const path = require('path');
const process = require('process');

const AppName = 'Mapcraft';
if (!process.env.APPDATA)
	process.env.APPDATA = (process.platform === 'darwin' ? `${process.env.HOME}/Library/Preferences` : `${process.env.HOME}/.local/share`);

module.exports = () =>
{
	const appPath = path.join(process.env.APPDATA, AppName, 'plugins');
	const init = async (componentPath) =>
	{
		await fs.mkdir(appPath, { recursive: true });
		try
		{
			await fs.writeFile(componentPath, '[]', { encoding: 'utf-8', flag: 'wx' });
		}
		catch (err)
		{
			// make nothing if file exist
		}
	};
	init(path.join(appPath, 'components.json'));
	return appPath;
};
