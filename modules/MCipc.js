const { ipcRenderer } = require('electron');

const Channel = {
	Dialog: ['open-file', 'open-directory', 'selected-file', 'selected-directory', 'question', 'error'],
	Editor: ['open', 'open-modal', 'close', 'close-modal', 'save-file'],
	Log: ['is-change', 'send-change'],
	Notification: ['click-notification'],
	Plugin: ['is-changed', 'update-interface'],
	Shell: ['send-command', 'new-command', 'execute-command'],
	Start: ['is-selected-world'],
	Update: ['open-window', 'create-modal', 'close-modal', 'make-update'],
	User: ['close-window', 'change-username', 'remove-blur'],
	WorkProgress: ['signal-open-modal', 'open-modal', 'signal-close-modal', 'close-modal'],
	/* === Plugins === */
	Cutscene: ['signal-create-cutscene', 'create-cutscene'],
	Trigger: ['signal-open-modal', 'open-modal'],
	Recipes: ['signal-is-exist', 'is-exist', 'signal-open-switcher', 'open-switcher'],
};
const validChannels = [];

class ArrayIPC
{
	constructor()
	{
		for (const i in Channel)
			if (Object.prototype.hasOwnProperty.call(Channel, i))
			{
				const channel = i;
				const array = Channel[i];
				for (const y in array)
					if (Object.prototype.hasOwnProperty.call(array, y))
						validChannels.push(`${channel}:${array[y]}`);
			}
	}
}

const newIPC = new ArrayIPC(); // eslint-disable-line

const IPC = {
	/**
	 * Send data to specific channel
	 * @param {String} channel Name of channel
	 * @param  {...any} args List of argument(s)
	 */
	send: (channel, ...args) =>
	{
		if (!ipcRenderer)
			return;
		(async () =>
		{
			try
			{
				if (channel !== undefined && validChannels.includes(channel))
					ipcRenderer.send(channel, ...args);
				else
					throw new Error(`${channel} is not autorized`);
			}
			catch (err)
			{
				throw new Error(err);
			}
		})().catch((err) => console.error(err));
	},
	/**
	 * Receive response from specific channel
	 * @param {String} channel Name of channel
	 * @param {Function} func Function of promise
	 */
	receive: (channel, func) =>
	{
		if (!ipcRenderer)
			return;
		(async () =>
		{
			try
			{
				if (channel !== undefined && validChannels.includes(channel))
					ipcRenderer.on(channel, (event, ...args) => func(...args));
				else
					throw new Error(`${channel} is not autorized`);
			}
			catch (err)
			{
				throw new Error(`MCipc: ${err}`);
			}
		})().catch((err) => console.error(err));
	},
};

module.exports = IPC;
