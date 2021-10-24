export = NewObj;
declare const NewObj: MClog;
declare class MClog {
    logLink: string;
    oldData: string;
    /**
     * Force print log in text area, prefer @function `PrintToTextArea()`
     */
    forcePrintToTextArea(): void;
    /**
     * Print lastest log in text area
     * @param {String} oldData
     */
    PrintToTextArea(data: any): void;
    /**
     * Watch change in log file
     */
    watchLog(): void;
}
