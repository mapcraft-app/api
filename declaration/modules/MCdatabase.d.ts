export = CreateDB;
declare class CreateDB {
    /**
     * Create a new world database
     * @param {String} link Path to new database
     */
    constructor(link: string);
    db: any;
    /**
     * Add every tables
     * @private
     */
    private _addTable;
    /**
     * Add specific user table
     * @private
     */
    private _addTableUser;
    /**
     * Add specific trigger table
     * @private
     */
    private _addTableTrigger;
    /**
     * Add specific cutscene table
     * @private
     */
    private _addTableCutscene;
}
