const fs = require('fs');
const OS = require('os');
const path = require('path');
const process = require('process');
const MCutilities = require('./MCutilities');

MCutilities.GetAppDataPath();

// API const
const OSType = OS.platform();
const pack = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../', 'src/manifest'), { encoding: 'utf-8', flag: 'r' }));
const _APIVersion = pack.version;
const DefaultLang = pack.default_lang;
const ComponentsLink = path.join(__dirname, '../../../', 'src/dist/template/Main/components.json');
const { AppDataPath } = process.env;

class MC
{
	constructor()
	{
		if (!fs.existsSync('config.json'))
			this.ResetConfigFile();
		this.UpdateAPIVersion();
	}

	/**
	 * Update 'APIVersion' key with last API version
	 */
	static UpdateAPIVersion()
	{
		const data = JSON.parse(fs.readFileSync(path.join(AppDataPath, 'config.json'), { encoding: 'utf-8', flag: 'r' }));
		data.Env.APIVersion = _APIVersion;
		fs.writeFileSync(path.join(AppDataPath, 'config.json'), JSON.stringify(data, null, 4), { encoding: 'utf-8', flag: 'w' });
	}

	/**
	 * Reset config.json file with default values
	 */
	static ResetConfigFile()
	{
		let linkToGame;
		if (OS.platform() === 'win32')
			linkToGame = path.join(process.env.APPDATA, '.minecraft');
		else if (OS.platform() === 'linux')
			linkToGame = path.join(process.env.HOME, '.minecraft');
		else if (OS.platform() === 'darwin')
			linkToGame = path.join(process.env.HOME, 'Library', 'Application Support', 'minecraft');
		const config = {
			Env: {
				OS: OSType,
				TempPath: OS.tmpdir(),
				AppDataPath,
				GamePath: linkToGame,
				SavePath: path.join(linkToGame, 'saves'),
				Lang: DefaultLang,
				Components: ComponentsLink,
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
	 */
	static UpdateConfig(temp = OS.tmpdir(), data, save, lang = DefaultLang, resourcepack = 'Mapcraft-resource', datapack = 'Mapcraft-data')
	{
		const config = {
			Env: {
				OS: OSType,
				TempPath: temp,
				AppDataPath,
				GamePath: data,
				SavePath: save,
				Lang: lang,
				Components: ComponentsLink,
				APIVersion: _APIVersion,
			},
			Data: {
				ResourcePack: resourcepack,
				DataPack: datapack,
			},
		};
		fs.writeFileSync(path.join(AppDataPath, 'config.json'), JSON.stringify(config, null, 4), { encoding: 'utf-8', flag: 'w' });
	}

	// Getters
	/**
	 * Get config.json data
	 * @returns {JSON} JSON data
	 */
	static GetConfig()
	{
		return (JSON.parse(fs.readFileSync(path.join(AppDataPath, 'config.json'), { encoding: 'utf-8', flag: 'r' })));
	}

	/**
	 * Get current lang of application
	 * @returns {String}  Current lang
	 */
	GetLang()
	{
		return (this.GetConfig().Env.Lang);
	}
}

module.exports = new MC();
