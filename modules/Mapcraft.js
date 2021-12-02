/* eslint-disable default-param-last */
const { app } = require('electron');
const fs = require('fs');
const OS = require('os');
const path = require('path');
const process = require('process');
const MCutilities = require('./MCutilities');

const MinecraftVersion = require('./json/version.json');

MCutilities.GetAppDataPath();
if (!process.env.AppPath)
	process.env.AppPath = app.getAppPath();
if (path.win32.basename(process.env.AppPath) === 'app.asar')
	process.env.AppPath = path.join(process.env.AppPath, '../'); // ressources dir for build version

// API const
const { AppDataPath, AppPath } = process.env;
const OSType = OS.platform();
const pack = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../', 'src/manifest'), { encoding: 'utf-8', flag: 'r' }));
const _APIVersion = pack.version;
const DefaultLang = pack.default_lang;
const ComponentsLink = path.join(__dirname, '../../../', 'src/dist/template/Main/components.json');
const ActiveComponents = path.join(AppDataPath, 'builtin.json');
const UserComponentsLink = path.join(AppPath, 'plugins');

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
			this.ResetConfigFile();
		const data = JSON.parse(fs.readFileSync(path.join(AppDataPath, 'config.json'), { encoding: 'utf-8', flag: 'r' }));
		const MinecraftSelectedVersion = data.Minecraft.SelectedVersion;
		this.UpdateConfig(data.Env.TempPath, data.Env.GamePath, data.Env.SavePath, data.Env.Lang, data.Data.ResourcePack, data.Data.DataPack, data.Env.APIVersion);
		this.SetSelectedVersion(MinecraftSelectedVersion);
	}

	/**
	 * Reset config.json file with default values
	 */
	ResetConfigFile()
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
	 * @param {String} temp Tempory directory path, default to OS.tempdir();
	 * @param {String} data Game path (required)
	 * @param {String} save Save path (required)
	 * @param {String} lang Lang of application, default 'default_lang' key of manifest
	 * @param {String} resourcepack Name of resource pack, default 'Mapcraft-resource'
	 * @param {String} datapack Name of data pack, default 'Mapcraft-data'
	 * @param {String} apiVersion Version of API
	 */
	UpdateConfig(temp = OS.tmpdir(), data, save, lang = DefaultLang, resourcepack = 'Mapcraft-resource', datapack = 'Mapcraft-data', apiVersion = _APIVersion)
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
	SetSelectedVersion(version = MinecraftVersion.LastestVersion)
	{
		const config = this.GetConfig();
		config.Minecraft.SelectedVersion = version;
		fs.writeFileSync(path.join(AppDataPath, 'config.json'), JSON.stringify(config, null, 4), { encoding: 'utf-8', flag: 'w' });
		global.MinecraftSelectedVersion = version;
	}

	/**
	 * Get config.json data
	 * @returns {JSON} JSON data
	 */
	GetConfig()
	{
		return (JSON.parse(fs.readFileSync(path.join(AppDataPath, 'config.json'), { encoding: 'utf-8', flag: 'r' })));
	}

	/**
	 * Get current lang of application
	 * @returns {String} Current lang
	 */
	GetLang()
	{
		return (this.GetConfig().Env.Lang);
	}

	/**
	 * Get manifest data
	 * @returns {JSON} JSON data
	 */
	GetManifest()
	{
		return (pack);
	}
}

module.exports = new MC();
