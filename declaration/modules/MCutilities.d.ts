export = MCutilities;
declare class MCutilities {
    /**
     * Returns a Boolean value that indicates if string is valid in Minecraft format
     * @param {String} string String to check
     * @returns {Boolean} False if the string contains an unauthorized character
     */
    static checkIsLegalString(string: string): boolean;
    /**
     * Get next character in alphabet
     * @param {String} char
     * @returns {String} next character
     * @example <caption>print alphabet in order</caption>
     * for (let char = 'a'; char != 'z'; char = MCutilities.nextLetter(char))
     * console.log(char);
     */
    static nextLetter(char: string): string;
    /**
     * Generate ENV of system for application
     */
    static generateENV(): void;
    /**
     * Download file from web, accept http and https url
     * This function does not check the content of the downloaded file, it is up to you to perform the necessary checks so as not to compromise the user's security
     * @param {String} url url of download file
     * @param {String} destination path of file destination
     * @param {Function} callback callback function with (error)
     */
    static download(url: string, destination: string, callback: Function): void;
    /**
     * Check if directory is empty
     * @param {String} dirname path to directory
     * @returns {Boolean} True if is empty
     */
    static isEmptyDir(dirname: string): boolean;
    /**
     * Get lang of component
     * @param {String} dirname __dirname of component
     * @param {String} langPath MC.config.Env.Lang
     * @param {String} defaultDir default directory of lang file
     * @returns {JSON} JSON data of lang file, or undefined if error
     */
    static getLang(dirname: string, langPath: string, defaultDir?: string): JSON;
    /**
      * Retrieved data from package.json
      * @param {String} dirname Folder in which you want to search
      * @returns {JSON} JSON data of package, or undefined if error
      */
    static getPackage(dirname: string): JSON;
    /**
     * Retrieved data on game elements
     * @param {String} type Type of data to be retrieved (`biomes`, `blocks`, `effects`, `enchantements`, `entities`, `items`, `potions`, `structures`, `tags`, `triggers`)
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns {JSON} JSON data, or undefined if error
     */
    static getDataGameElement(type: string, minecraftVersion?: any): JSON;
    /**
     * Print alert in HTMLelement
     * @param {String} type Type of error (`primary`, `success`, `warning`, `danger`)
     * @param {Element} DOMelement Element in which alert will be displayed
     * @param {String} str Error message
     */
    static createAlert(type: string, DOMelement: Element, str: string): void;
}
