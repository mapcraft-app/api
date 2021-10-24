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
    private _AddTable;
    /**
     * Add specific user table
     * @private
     */
    private _AddTableUser;
    /**
     * Add specific trigger table
     * @private
     */
    private _AddTableTrigger;
    /**
     * Add specific cutscene table
     * @private
     */
    private _AddTableCutscene;
}
