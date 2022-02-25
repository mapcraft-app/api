const fs = require('fs');
const OS = require('os');
const path = require('path');
const process = require('process');
const MCutilities = require('./MCutilities');
const MinecraftVersion = require('./json/version.json');

MCutilities.generateENV();

// API const
const { AppDataPath, AppPath } = process.env;
const OSType = OS.platform();

const pack = JSON.parse(fs.readFileSync(path.join(AppPath, 'src', 'manifest'), { encoding: 'utf-8', flag: 'r' }));
const _APIVersion = pack.version;
const DefaultLang = pack.default_lang;

const ComponentsLink = path.join(AppPath, 'src', 'dist', 'template', 'Main', 'components.json');
const ActiveComponents = path.join(AppDataPath, 'builtin.json');
const UserComponentsLink = path.join(AppDataPath, 'plugins');

class MC
{
	/**
	 * Function allowing to access all the configuration information of the user and more generally of the application (especially config.json).
	 * Generates the necessary files if they do not exist.
	 * Also allows you to reset the configuration file to the default values at any error.
	 */
	constructor()
	{
		if (!fs.existsSync(ActiveComponents))
			fs.writeFileSync(path.join(ActiveComponents), '[]', { encoding: 'utf-8' });
		if (!fs.existsSync(UserComponentsLink))
		{
			fs.mkdirSync(UserComponentsLink, { recursive: true, mode: 0o777 });
			fs.writeFileSync(path.join(UserComponentsLink, 'components.json'), '[]', { encoding: 'utf-8' });
		}
		if (!fs.existsSync(path.join(AppDataPath, 'config.json')))
			this.resetConfigFile();
		const data = JSON.parse(fs.readFileSync(path.join(AppDataPath, 'config.json'), { encoding: 'utf-8', flag: 'r' }));
		let MinecraftSelectedVersion;
		if (Object.prototype.hasOwnProperty.call(data, 'Minecraft') && Object.prototype.hasOwnProperty.call(data.Minecraft, 'SelectedVersion'))
			MinecraftSelectedVersion = data.Minecraft.SelectedVersion;
		else
			MinecraftSelectedVersion = MinecraftVersion.LastestVersion;
		this.updateConfig(data.Env.GamePath, data.Env.SavePath, data.Env.TempPath, data.Env.Lang, data.Data.ResourcePack, data.Data.DataPack, data.Env.APIVersion);
		this.setSelectedVersion(MinecraftSelectedVersion);
	}

	/**
	 * Reset config.json file with default values
	 */
	resetConfigFile()
	{
		let linkToGame;
		if (OS.platform() === 'win32')
			linkToGame = path.join(process.env.APPDATA, '.minecraft');
		else if (OS.platform() === 'linux')
			linkToGame = path.join(process.env.HOME, '.minecraft');
		else if (OS.platform() === 'darwin')
			linkToGame = path.join(process.env.HOME, 'Library', 'Application Support', 'minecraft');
		const config = {
			Minecraft: MinecraftVersion,
			Env: {
				OS: OSType,
				TempPath: OS.tmpdir(),
				AppDataPath,
				GamePath: linkToGame,
				SavePath: path.join(linkToGame, 'saves'),
				Lang: DefaultLang,
				Components: ComponentsLink,
				ActiveComponents: ActiveComponents, // eslint-disable-line object-shorthand
				PluginsComponents: UserComponentsLink,
				APIVersion: _APIVersion,
			},
			Data: {
				ResourcePack: 'Mapcraft-resource',
				DataPack: 'Mapcraft-data',
			},
		};
		fs.writeFileSync(path.join(AppDataPath, 'config.json'), JSON.stringify(config, null, 4), { encoding: 'utf-8', flag: 'w' });
	}

	/**
	 * Update config.json file with new values
	 * @param {String} data Path to the game folder (required)
	 * @param {String} save Path to the game saves folder (required)
	 * @param {String} temp Path to the temporary folder, default to OS.tempdir();
	 * @param {String} lang Lang of application, default 'default_lang' key of manifest
	 * @param {String} resourcepack Name of resource pack, default 'Mapcraft-resource'
	 * @param {String} datapack Name of data pack, default 'Mapcraft-data'
	 * @param {String} apiVersion Version of API
	 */
	updateConfig(data, save, temp = OS.tmpdir(), lang = DefaultLang, resourcepack = 'Mapcraft-resource', datapack = 'Mapcraft-data', apiVersion = _APIVersion)
	{
		const config = {
			Minecraft: MinecraftVersion,
			Env: {
				OS: OSType,
				TempPath: temp,
				AppDataPath,
				GamePath: data,
				SavePath: save,
				Lang: lang,
				Components: ComponentsLink,
				ActiveComponents: ActiveComponents, // eslint-disable-line object-shorthand
				PluginsComponents: UserComponentsLink,
				APIVersion: apiVersion,
			},
			Data: {
				ResourcePack: resourcepack,
				DataPack: datapack,
			},
		};
		fs.writeFileSync(path.join(AppDataPath, 'config.json'), JSON.stringify(config, null, 4), { encoding: 'utf-8', flag: 'w' });
	}

	/**
	 * Set selected minecraft version by user
	 * @param {String} version Selected version
	 */
	setSelectedVersion(version = MinecraftVersion.LastestVersion)
	{
		const { config } = this;
		config.Minecraft.SelectedVersion = version;
		fs.writeFileSync(path.join(AppDataPath, 'config.json'), JSON.stringify(config, null, 4), { encoding: 'utf-8', flag: 'w' });
		global.MinecraftSelectedVersion = version;
	}

	/**
	 * Get config.json data
	 * @returns {JSON} JSON data
	 */
	get config()
	{
		return (JSON.parse(fs.readFileSync(path.join(AppDataPath, 'config.json'), { encoding: 'utf-8', flag: 'r' })));
	}

	/**
	 * Get current lang of application
	 * @returns {String} Current lang
	 */
	get lang()
	{
		return (this.config.Env.Lang);
	}

	/**
	 * Get manifest data
	 * @returns {JSON} JSON data
	 */
	get manifest()
	{
		return (pack);
	}
}

module.exports = new MC();
