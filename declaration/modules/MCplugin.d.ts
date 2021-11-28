export = MCplugin;
declare class MCplugin {
    /**
     * Preload plugins
     * @param {String} directory Folder where the plugins are located, @default path_to_builtin_plugins
     */
    constructor(directory?: string);
    Components: any;
    BaseLink: string;
    __default: any;
    plugins: any;
    /**
     * Get instance of component
     * @param {String} Name Name of component
     * @returns Instance function of component, or undefined if error
     */
    Instance(Name: string): any;
    /**
     * Get component
     * @param {String} Name Name of component
     * @returns Full component, or undefined if error
     */
    Component(Name: string): any;
    /**
     * Toogle component
     * @param {String} Name Name of component
     * @param {Boolean} forceValue Set to true/false if you want to force activate/desactivate plugin
     */
    Toogle(Name: string, forceValue?: boolean): void;
    /**
     * Get lang data of component
     * @param {String} Name Name of component
     * @returns {JSON} Lang data
     */
    Lang(Name: string): JSON;
    /**
      * Get lang data of default component
      * @returns {JSON} Lang data
      */
    Default(): JSON;
    /**
     * Get full list of components
     * @returns List of components
     */
    ListComponents(): any;
}
