const fs = require('fs');
const readLastLines = require('read-last-lines');
const path = require('path');
const IPC = require('./MCipc');
const MC = require('./Mapcraft');

class MClog
{
	/**
	 * Reads and monitors the game log file
	 */
	constructor()
	{
		this.logLink = path.join(MC.config.Env.GamePath, 'logs/latest.log');
		this.oldData = '';
		readLastLines.read(this.logLink, 100).then((lines) =>
		{
			this.oldData = lines;
			this.forcePrintToTextArea();
		});
	}

	/**
	 * Force print log in text area, prefer @function `printToTextArea()`
	 */
	forcePrintToTextArea()
	{
		IPC.send('Log:is-change', this.oldData, null);
	}

	/**
	 * Print lastest log in text area
	 * @param {string} data latest data on string format
	 */
	printToTextArea(data)
	{
		document.getElementById('log-textarea').innerHTML = data;
		document.getElementById('log-textarea').scrollTop = document.getElementById('log-textarea').scrollHeight;
	}

	/**
	 * Watch change in log file
	 */
	watchLog()
	{
		fs.watchFile(this.logLink, { persistent: true, interval: 100 }, (curr, prev) => // eslint-disable-line
		{
			fs.readFile(this.logLink, 'utf-8', (error, data) =>
			{
				const diff = data.replace(this.oldData, '').trim();
				this.oldData = data;
				IPC.send('Log:is-change', data, diff);
			});
		});
	}
}

const NewObj = new MClog();

module.exports = NewObj;
