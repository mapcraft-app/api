export = MCshell;
declare class MCshell {
    /**
     * Parse a line and return data if the program exists
     * @param {String} line Line to be parsed
     * @returns {JSON} Preformed data, or null if error
     */
    static parse(line: string): JSON;
    /**
     * Trigger built-in
     * @private
     */
    private static _trigger;
    /**
     * Cutscene built-in
     * @private
     */
    private static _cutscene;
    /**
     * Option built-in
     * @private
     */
    private static _option;
}
