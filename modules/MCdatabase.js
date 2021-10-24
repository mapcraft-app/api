const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

class CreateDB
{
	/**
	 * Create a new world database
	 * @param {String} link Path to new database
	 */
	constructor(link)
	{
		this.db = new Database(link, { verbose: console.log });
		console.log(__dirname);
		this._AddTable();
	}

	/**
	 * Add every tables
	 * @private
	 */
	_AddTable()
	{
		this._AddTableUser();
		this._AddTableTrigger();
		this._AddTableCutscene();
	}

	/**
	 * Add specific user table
	 * @private
	 */
	_AddTableUser()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_user.sql'), 'utf8'));
	}

	/**
	 * Add specific trigger table
	 * @private
	 */
	_AddTableTrigger()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_trigger.sql'), 'utf8'));
	}

	/**
	 * Add specific cutscene table
	 * @private
	 */
	_AddTableCutscene()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_cutscene.sql'), 'utf8'));
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_cutscene_point.sql'), 'utf8'));
	}
}

module.exports = CreateDB;
