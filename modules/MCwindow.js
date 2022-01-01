const { BrowserWindow } = require('electron');
const path = require('path');
const MCutilities = require('./MCutilities');

MCutilities.GenerateENV();

class MCwindow
{
	/**
	 * Create new instance of window
	 * @param {Number} _width Width of window
	 * @param {Number} _height Height of window
	 * @param {String} _preload Path of preload file, see @link https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
	 * @returns {BrowserWindow} Instance of BrowserWindow
	 */
	static CreateWindow(_width, _height, _preload)
	{
		const _newWindow = new BrowserWindow({
			width: _width,
			height: _height,
			minWidth: 800,
			minHeight: 600,
			center: true,
			show: false,
			frame: true,
			icon: path.join(process.env.AppPath, 'src', 'dist', 'img', 'icon', 'icon.ico'),
			// icon: path.join(__dirname, '../../../', 'src/dist/img/icon/icon.ico'),
			webPreferences: {
				defaultEncoding: 'utf-8',
				enableWebSQL: false,
				nodeIntegration: false,
				contextIsolation: true,
				enableRemoteModule: false,
				webSecurity: true,
				preload: _preload,
			},
		});
		return (_newWindow);
	}

	/**
	 * Open window with file
	 * @param {BrowserWindow} windowInstance BrowserWindow instance
	 * @param {String} page Path of file loaded in window
	 */
	static OpenWindow(windowInstance, page)
	{
		windowInstance.setMenuBarVisibility(false);
		windowInstance.loadFile(page);
		// windowInstance.webContents.openDevTools();
	}
}

module.exports = MCwindow;
