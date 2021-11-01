const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const process = require('process');

class MCutilities
{
	/**
	 * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
	 * @param {String} string String to check
	 * @returns {Boolean} False if the string contains an unauthorized character
	 */
	static CheckIfStringIsLegalCharacter(string)
	{
		const Regex = new RegExp('[^-a-z0-9_/.]+', 'gm');
		if (Regex.test(string))
			return (false);
		return (true);
	}

	/**
	 * Get next character in alphabet
	 * @param {String} char
	 */
	static GetNextCharacterInAlphabet(char)
	{
		return String.fromCharCode(char.charCodeAt(0) + 1);
	}

	/**
	 * Generate path of AppData directory of system
	 * @return process.env.AppDataPath
	 */
	static GetAppDataPath()
	{
		const __MAPCRAFT = 'mapcraft';
		process.env.AppDataPath = String;
		switch (process.platform)
		{
			case 'darwin': {
				process.env.AppDataPath = path.join(process.env.HOME, 'Library', 'Application Support', __MAPCRAFT);
				break;
			}
			case 'win32': {
				process.env.AppDataPath = path.join(process.env.APPDATA, __MAPCRAFT);
				break;
			}
			case 'linux': {
				process.env.AppDataPath = path.join(process.env.HOME, __MAPCRAFT);
				break;
			}
			default: {
				console.log('Unsupported platform!');
				process.exit(1);
			}
		}
		if (!fs.existsSync(process.env.AppDataPath))
			fs.mkdirSync(process.env.AppDataPath);
	}

	/**
	 * Download file from web, accept http and https url
	 * @param {string} url url of download file
	 * @param {string} destination path of file destination
	 * @param {function} callback callback function with (error)
	 */
	static download(url, destination, callback)
	{
		const file = fs.createWriteStream(destination);
		let httpMethod;
		if (url.indexOf(('https://')) !== -1)
			httpMethod = https;
		else
			httpMethod = http;
		const request = httpMethod.get(url, (response) => // eslint-disable-line
		{
			if (response.statusCode !== 200)
				return callback(`${response.statusCode} error to ${url}`);
			response.pipe(file);
			file.on('finish', () =>
			{
				file.close(callback);
			});
		});
		request.on('error', (err) =>
		{
			fs.unlink(destination, (errFs) =>
			{
				if (errFs)
					console.error('download request error:', errFs);
			});
			callback(err.message);
		});
		file.on('error', (err) =>
		{
			fs.unlink(destination, (errFs) =>
			{
				if (errFs)
					console.error('download request error:', errFs);
			});
			callback(err.message);
		});
	}

	/**
	 * Check if directory is empty
	 * @param {string} path path to directory
	 */
	static IsEmptyDir(_path)
	{
		return fs.readdirSync(_path).length === 0;
	}

	/**
	 * Get lang of component
	 * @param {string} _dirname __dirname of component
	 * @param {string} _langPath MC.GetConfig().Env.Lang
	 * @returns {JSON} JSON data of lang file, or undefined if error
	 */
	static GetLang(_dirname, _langPath)
	{
		let data;
		try
		{
			data = JSON.parse(fs.readFileSync(path.join(_dirname, './lang', `${_langPath}.json`)));
		}
		catch (err)
		{
			throw new Error(err);
		}
		return (data);
	}

	/**
	 * Retrieved data from package.json
	 * @param {string} _dirname Folder in which you want to search
	 * @returns {JSON} JSON data of package, or undefined if error
	 */
	static GetPackage(_dirname)
	{
		let data;
		try
		{
			data = JSON.parse(fs.readFileSync(path.join(_dirname, 'package.json')));
		}
		catch (err)
		{
			data = undefined;
		}
		return (data);
	}

	/**
	 * Retrieved data on game elements
	 * @param {String} type Type of data to be retrieved (blocks, items, potions, tags, triggers)
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns {JSON} JSON data, or undefined if error
	 */
	static GetDataGameElement(type, minecraftVersion = '1.17')
	{
		try
		{
			return JSON.parse(fs.readFileSync(path.join(__dirname, `./json/${minecraftVersion}/${type}.json`), { encoding: 'utf-8', flag: 'r' }));
		}
		catch (err)
		{
			return undefined;
		}
	}

	/**
	 * Print alert in DOMelement
	 * @param {string} type Type of error (primary, success, warning, danger)
	 * @param {DOMelement} DOMelement
	 * @param {string} str Error string
	 */
	static CreateAlert(type, DOMelement, str)
	{
		const alert = document.createElement('div');
		alert.classList.add(`uk-alert-${type}`);
		alert.setAttribute('uk-alert', '');
		const closeButton = document.createElement('a');
		closeButton.classList.add('uk-alert-close');
		closeButton.setAttribute('uk-close', '');
		const text = document.createElement('p').appendChild(document.createTextNode(str));
		alert.appendChild(closeButton);
		alert.appendChild(text);
		DOMelement.appendChild(alert);
	}
}

module.exports = MCutilities;
