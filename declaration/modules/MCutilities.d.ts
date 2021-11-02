export = MCutilities;
declare class MCutilities {
    /**
     * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
     * @param {String} string String to check
     * @returns {Boolean} False if the string contains an unauthorized character
     */
    static CheckIfStringIsLegalCharacter(string: string): boolean;
    /**
     * Get next character in alphabet
     * @param {String} char
     */
    static GetNextCharacterInAlphabet(char: string): string;
    /**
     * Generate path of AppData directory of system
     * @return process.env.AppDataPath
     */
    static GetAppDataPath(): void;
    /**
     * Download file from web, accept http and https url
     * @param {string} url url of download file
     * @param {string} destination path of file destination
     * @param {function} callback callback function with (error)
     */
    static download(url: string, destination: string, callback: Function): void;
    /**
     * Check if directory is empty
     * @param {string} path path to directory
     */
    static IsEmptyDir(_path: any): boolean;
    /**
     * Get lang of component
     * @param {string} _dirname __dirname of component
     * @param {string} _langPath MC.GetConfig().Env.Lang
     * @returns {JSON} JSON data of lang file, or undefined if error
     */
    static GetLang(_dirname: string, _langPath: string): JSON;
    /**
     * Retrieved data from package.json
     * @param {string} _dirname Folder in which you want to search
     * @returns {JSON} JSON data of package, or undefined if error
     */
    static GetPackage(_dirname: string): JSON;
    /**
     * Retrieved data on game elements
     * @param {String} type Type of data to be retrieved (`biomes`, `blocks`, `effects`, `enchantements`, `entities`, `items`, `potions`, `tags`, `triggers`)
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns {JSON} JSON data, or undefined if error
     */
    static GetDataGameElement(type: string, minecraftVersion?: string): JSON;
    /**
     * Print alert in HTMLelement
     * @param {string} type Type of error (`primary`, `success`, `warning`, `danger`)
     * @param {Element} DOMelement Element in which alert will be displayed
     * @param {string} str Error message
     */
    static CreateAlert(type: string, DOMelement: Element, str: string): void;
}
