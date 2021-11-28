export = MCfs;
declare class MCfs {
    /**
     * Add a line at the end of the file
     * @param {String} File File path
     * @param {String} Line Line appended to file
     */
    static AddLine(File: string, Line: string): void;
    /**
     * Modify the line at the first occurrence find, add new line at the end of file if not exist if `AddIsNotExit` set to true
     * @param {String} File File path
     * @param {String} Occurence Search string
     * @param {String} NewLine Line to record
     * @param {Boolean} AddIfNotExit Set to true if the line must be added at the end of the file if it does not exist
     */
    static ModifyLine(File: string, Occurence: string, NewLine?: string, AddIfNotExit?: boolean): Promise<void>;
    /**
     * Delete the line on which the first occurrence is found
     * @param {String} File File path
     * @param {String} Occurence Search string
     */
    static DeleteLine(File: string, Occurence: string): void;
}
