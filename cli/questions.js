const licenses = [
	{ title: 'AGPL-3.0' },
	{ title: 'Apache-2.0' },
	{ title: 'Beerware' },
	{ title: 'BSL-1.0' },
	{ title: 'GPL-3.0' },
	{ title: 'LGPL-3.0' },
	{ title: 'MIT' },
	{ title: 'MPL-2.0' },
	{ title: 'Unlicense' },
	{ title: 'Proprietary' },
	{ title: 'Other' },
];

const questions = [
	{
		type: 'text',
		name: 'name',
		message: 'What is the name of your plugin',
		initial: 'new_plugin',
		validate(val)
		{
			const regex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
			const err = 'Must be lowercase and one word, and may contain hyphens and underscores';
			return (val.match(regex)) ? true : err;
		},
	},
	{
		type: 'text',
		name: 'title',
		message: 'What will be the name displayed in the application of your plugin',
		initial: 'New Plugin',
		validate(val)
		{
			const regex = /^[a-zA-Z0-9-_\s]+$/;
			const err = 'Must be only letters, numbers, underscore, dashed or space';
			return (val.match(regex)) ? true : err;
		},
	},
	{
		type: 'text',
		name: 'version',
		message: 'What will be the first version',
		initial: '1.0.0',
		validate(val)
		{
			const regex = /^([0-9]\.[0-9]\.[0-9])$/;
			const err = 'The format is (0-9).(0-9).(0-9)';
			return (val.match(regex)) ? true : err;
		},
	},
	{
		type: 'text',
		name: 'author',
		message: 'What is the name of the author',
		initial: 'John Doe',
	},
	{
		type: 'text',
		name: 'description',
		message: 'Write a quick description of your plugin',
		initial: 'My wonderful plugin',
	},
	{
		type: 'select',
		name: 'license',
		message: 'What license will your plugin be under',
		choices: licenses,
		initial: 0,
		format(val)
		{
			const name = {
				name: String(licenses[val].title.toLowerCase()),
				link: String(''),
				regex: RegExp(),
			};
			if (name.name === 'beerware')
			{
				name.link = 'https://fedoraproject.org/wiki/Licensing/Beerware';
				name.regex = /<pre>(?<license>.*)<\/pre>/gms;
			}
			else if (name.name === 'proprietary' || name.name === 'other')
			{
				name.link = undefined;
				name.regex = undefined;
			}
			else
			{
				name.link = `https://choosealicense.com/licenses/${name.name}/`;
				name.regex = /<pre id="license-text">(?<license>.*)<\/pre>/gms;
			}
			return name;
		},
	},
	{
		type: 'text',
		name: 'component',
		message: 'What will be the name of the main input file',
		initial: 'index.js',
		validate(val)
		{
			const regex = /^[a-zA-Z0-9_.]{1,}(\.js)/i;
			const err = 'Must be only letters, numbers, underscore and dot. Must have as extension .js';
			return (val.match(regex)) ? true : err;
		},
	},
	{
		type: 'text',
		name: 'lang',
		message: 'In which folder will the language files be placed',
		initial: 'lang',
		validate(val)
		{
			const regex = /^[a-zA-Z_]+$/;
			const err = 'Must be only letters or underscore';
			return (val.match(regex)) ? true : err;
		},
	},
	{
		type: 'toggle',
		name: 'isNotification',
		message: 'Will there be notifications',
		initial: false,
		active: 'yes',
		inactive: 'no',
	},
];

module.exports = { licenses, questions };
