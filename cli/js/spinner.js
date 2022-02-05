const process = require('process');
const os = require('os');
const formats = require('./format');

let saveInterval;
class Spinner
{
	static start(string)
	{
		process.stdout.write('\x1B[?25l');
		const spinners = ['⣷', '⣯', '⣟', '⡿', '⢿', '⣻', '⣽', '⣾'];
		let index = 0;
		saveInterval = setInterval(() =>
		{
			process.stdout.clearLine();
			let line = spinners[index];
			if (line === undefined)
			{
				index = 0;
				line = spinners[index];
			}
			if (os.platform === 'win32')
				process.stdout.write(`${formats.foreground.light.blue}${line} ${formats.format.reset}${string}\x1b[0G`);
			else
				process.stdout.write(`${formats.foreground.light.blue}${line} ${formats.format.reset}${string}\r`);
			index = index >= spinners.length ? 0 : ++index;
		}, 80);
	}

	static stop()
	{
		clearInterval(saveInterval);
		process.stdout.write('\x1B[?25h');
	}
}

module.exports = Spinner;
