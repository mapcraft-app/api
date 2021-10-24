const IPC = require('./MCipc');

const WorkInProgress = {
	/**
	 * Open Work in progress pop-up window
	 */
	open: () =>
	{
		IPC.send('WorkProgress:signal-open-modal');
	},
	/**
	 * Close Work in progress pop-up window
	 */
	close: () =>
	{
		IPC.send('WorkProgress:signal-close-modal');
	},
};

module.exports = WorkInProgress;
