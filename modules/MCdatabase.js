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
		this._addTable();
	}

	/**
	 * Add every tables
	 * @private
	 */
	_addTable()
	{
		this._addTableUser();
		this._addTableTrigger();
		this._addTableCutscene();
	}

	/**
	 * Add specific user table
	 * @private
	 */
	_addTableUser()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_user.sql'), 'utf8'));
	}

	/**
	 * Add specific trigger table
	 * @private
	 */
	_addTableTrigger()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_trigger.sql'), 'utf8'));
	}

	/**
	 * Add specific cutscene table
	 * @private
	 */
	_addTableCutscene()
	{
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_cutscene.sql'), 'utf8'));
		this.db.exec(fs.readFileSync(path.join(__dirname, 'sql/mc_cutscene_point.sql'), 'utf8'));
	}
}

module.exports = CreateDB;
