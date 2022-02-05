const { BrowserWindow } = require('electron');
const path = require('path');
const MCutilities = require('./MCutilities');

MCutilities.generateENV();

class MCwindow
{
	/**
	 * Create new instance of window
	 * @param {Number} width Width of window
	 * @param {Number} height Height of window
	 * @param {String} preload Path of preload file, see @link https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
	 * @param {String} icon Path to window icon, default to Mapcraft icon
	 * @returns {BrowserWindow} Instance of BrowserWindow
	 */
	static createWindow(width, height, preload, icon = path.join(process.env.AppPath, 'src', 'dist', 'img', 'icon', 'icon.ico'))
	{
		return new BrowserWindow(
			{
				width,
				height,
				minWidth: 800,
				minHeight: 600,
				center: true,
				show: false,
				frame: true,
				icon,
				webPreferences: {
					defaultEncoding: 'utf-8',
					enableWebSQL: false,
					nodeIntegration: false,
					contextIsolation: true,
					enableRemoteModule: false,
					webSecurity: true,
					preload,
				},
			},
		);
	}

	/**
	 * Open window with file
	 * @param {BrowserWindow} windowInstance BrowserWindow instance
	 * @param {String} page Path of file loaded in window
	 * @param {Boolean} devTools Open dev tools in window
	 */
	static openWindow(windowInstance, page, devTools = false)
	{
		windowInstance.setMenuBarVisibility(false);
		windowInstance.loadFile(page);
		if (devTools)
			windowInstance.webContents.openDevTools();
	}
}

module.exports = MCwindow;
