const formats = require('../js/format');

module.exports = (name, version) =>
{
	console.log(`${formats.format.underline}${formats.foreground.normal.cyan}${name}\
${formats.format.reset} version \
${formats.foreground.normal.green}${version}${formats.format.reset}`);
};
