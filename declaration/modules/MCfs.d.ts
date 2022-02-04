export = MCfs;
declare class MCfs {
    /**
     * Add a line at the end of the file
     * @param {String} file File path
     * @param {String} line Line appended to file
     */
    static addLine(file: string, line: string): void;
    /**
     * Modify the line at the first occurrence find, add new line at the end of file if not exist if `AddIsNotExit` set to true
     * @param {String} file File path
     * @param {String} occurence Search string
     * @param {String} newLine Line to record
     * @param {Boolean} addIfNotExit Set to true if the line must be added at the end of the file if it does not exist
     */
    static modifyLine(file: string, occurence: string, newLine?: string, addIfNotExit?: boolean): Promise<void>;
    /**
     * Delete the line on which the first occurrence is found
     * @param {String} file File path
     * @param {String} occurence Search string
     */
    static deleteLine(file: string, occurence: string): void;
}
