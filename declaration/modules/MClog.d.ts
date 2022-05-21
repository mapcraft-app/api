export = NewObj;
declare const NewObj: MClog;
declare class MClog {
    logLink: string;
    oldData: string;
    /**
     * Force print log in text area, prefer @function `printToTextArea()`
     */
    forcePrintToTextArea(): void;
    /**
     * Print lastest log in text area
     * @param {string} data latest data on string format
     */
    printToTextArea(data: string): void;
    /**
     * Watch change in log file
     */
    watchLog(): void;
}
