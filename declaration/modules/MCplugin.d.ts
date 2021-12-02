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
    builtins: any;
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
     * Check if component is active
     * @param {String} Name Name of component
     * @returns true/false if active/desactive; or undefined if not exist
     */
    Active(Name: string): any;
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
