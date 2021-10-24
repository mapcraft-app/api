const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

class CreateDB
{
	constructor(link)
	{
		this.db = new Database(link, { verbose: console.log });
		console.log(__dirname);
		this.AddTable();
	}

	/**
	 * Add necessary tables in database
	 */
	AddTable()
	{
		this._AddTableUser();
		this._AddTableTrigger();
		this._AddTableCutscene();
	}

	/**
	 * Private function, do not use, prefer AddTable()
	 */
	_AddTableUser()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_user.sql'), 'utf8'));
	}

	/**
	 * Private function, do not use, prefer AddTable()
	 */
	_AddTableTrigger()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_trigger.sql'), 'utf8'));
	}

	/**
	 * Private function, do not use, prefer AddTable()
	 */
	_AddTableCutscene()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_cutscene.sql'), 'utf8'));
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_cutscene_point.sql'), 'utf8'));
	}
}

module.exports = CreateDB;
