declare const _exports: MC;
export = _exports;
declare class MC {
    /**
     * Reset config.json file with default values
     */
    ResetConfigFile(): void;
    /**
     * Update config.json file with new values
     * @param {String} temp Tempory directory path, default to OS.tempdir();
     * @param {String} data Game path (required)
     * @param {String} save Save path (required)
     * @param {String} lang Lang of application, default 'default_lang' key of manifest
     * @param {String} resourcepack Name of resource pack, default 'Mapcraft-resource'
     * @param {String} datapack Name of data pack, default 'Mapcraft-data'
     * @param {String} apiVersion Version of API
     */
    UpdateConfig(temp: string, data: string, save: string, lang?: string, resourcepack?: string, datapack?: string, apiVersion?: string): void;
    /**
     * Set selected minecraft version by user
     * @param {String} version Selected version
     */
    SetSelectedVersion(version?: string): void;
    /**
     * Get config.json data
     * @returns {JSON} JSON data
     */
    GetConfig(): JSON;
    /**
     * Get current lang of application
     * @returns {String} Current lang
     */
    GetLang(): string;
    /**
     * Get manifest data
     * @returns {JSON} JSON data
     */
    GetManifest(): JSON;
}
