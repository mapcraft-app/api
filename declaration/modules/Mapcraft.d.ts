declare const _exports: MC;
export = _exports;
declare class MC {
    /**
     * Reset config.json file with default values
     */
    resetConfigFile(): void;
    /**
     * Update config.json file with new values
     * @param {String} data Path to the game folder (required)
     * @param {String} save Path to the game saves folder (required)
     * @param {String} temp Path to the temporary folder, default to OS.tempdir();
     * @param {String} lang Lang of application, default 'default_lang' key of manifest
     * @param {String} resourcepack Name of resource pack, default 'Mapcraft-resource'
     * @param {String} datapack Name of data pack, default 'Mapcraft-data'
     * @param {String} apiVersion Version of API
     */
    updateConfig(data: string, save: string, temp?: string, lang?: string, resourcepack?: string, datapack?: string, apiVersion?: string): void;
    /**
     * Set selected minecraft version by user
     * @param {String} version Selected version
     */
    setSelectedVersion(version?: string): void;
    /**
     * Get config.json data
     * @returns {JSON} JSON data
     */
    get config(): JSON;
    /**
     * Get current lang of application
     * @returns {String} Current lang
     */
    get lang(): string;
    /**
     * Get manifest data
     * @returns {JSON} JSON data
     */
    get manifest(): JSON;
}
