const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const process = require('process');
const { app } = require('electron');
const version = require('./json/version.json');

class MCutilities
{
	/**
	 * Returns a Boolean value that indicates if string is valid in Minecraft format
	 * @param {String} string String to check
	 * @returns {Boolean} False if the string contains an unauthorized character
	 */
	static checkIsLegalString(string)
	{
		const Regex = /[^-a-z0-9_/.]+/gm;
		if (Regex.test(string))
			return (false);
		return (true);
	}

	/**
	 * Get next character in alphabet
	 * @param {String} char
	 * @returns {String} next character
	 * @example <caption>print alphabet in order</caption>
	 * for (let char = 'a'; char != 'z'; char = MCutilities.nextLetter(char))
	 * console.log(char);
	 */
	static nextLetter(char)
	{
		return String.fromCharCode(char.charCodeAt(0) + 1);
	}

	/**
	 * Generate ENV of system for application
	 */
	static generateENV()
	{
		if (global.AppDataPath)
		{
			process.env.AppDataPath = global.AppDataPath;
		}
		else
		{
			if (!process.env.AppDataPath)
				process.env.AppDataPath = app.getPath('userData');
			if (!fs.existsSync(process.env.AppDataPath))
				fs.mkdirSync(process.env.AppDataPath);
			global.AppDataPath = process.env.AppDataPath;
		}
		if (!process.env.AppPath)
			process.env.AppPath = app.getAppPath();
		if (path.basename(process.env.AppPath) === 'app.asar')
			process.env.PRODUCTION = 'true';
		else
			process.env.PRODUCTION = 'false';
	}

	/**
	 * Download file from web, accept http and https url
	 * @param {String} url url of download file
	 * @param {String} destination path of file destination
	 * @param {Function} callback callback function with (error)
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
	 * @param {String} dirname path to directory
	 * @returns {Boolean} True if is empty
	 */
	static isEmptyDir(dirname)
	{
		return fs.readdirSync(dirname).length === 0;
	}

	/**
	 * Get lang of component
	 * @param {String} dirname __dirname of component
	 * @param {String} langPath MC.GetConfig().Env.Lang
	 * @param {String} defaultDir default directory of lang file
	 * @returns {JSON} JSON data of lang file, or undefined if error
	 */
	static getLang(dirname, langPath, defaultDir = 'lang')
	{
		let data;
		try
		{
			data = JSON.parse(fs.readFileSync(path.join(dirname, `./${defaultDir}`, `${langPath}.json`)));
		}
		catch (err)
		{
			throw new Error(err);
		}
		return (data);
	}

	/**
	  * Retrieved data from package.json
	  * @param {String} dirname Folder in which you want to search
	  * @returns {JSON} JSON data of package, or undefined if error
	  */
	static getPackage(dirname)
	{
		let data;
		try
		{
			data = JSON.parse(fs.readFileSync(path.join(dirname, 'package.json')));
		}
		catch (err)
		{
			data = undefined;
		}
		return (data);
	}

	/**
	 * Retrieved data on game elements
	 * @param {String} type Type of data to be retrieved (`biomes`, `blocks`, `effects`, `enchantements`, `entities`, `items`, `potions`, `structures`, `tags`, `triggers`)
	 * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
	 * @returns {JSON} JSON data, or undefined if error
	 */
	static getDataGameElement(type, minecraftVersion = version.LastestVersion)
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
	 * Print alert in HTMLelement
	 * @param {String} type Type of error (`primary`, `success`, `warning`, `danger`)
	 * @param {Element} DOMelement Element in which alert will be displayed
	 * @param {String} str Error message
	 */
	static createAlert(type, DOMelement, str)
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
