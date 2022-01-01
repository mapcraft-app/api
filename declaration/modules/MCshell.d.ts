declare const _exports: MCshell;
export = _exports;
declare class MCshell {
    commands: any[];
    /**
     * Add new command to shell
     * @param {any} json Array contains json elements
     */
    add(json: any): void;
    /**
     * Parse a line and return data if the program exists
     * @param {String} line Line to be parsed
     * @returns {JSON} Preformed data, or null if error
     */
    parse(line: string): JSON;
}
