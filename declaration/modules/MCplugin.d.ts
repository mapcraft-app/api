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
     * @param {String} name Name of component
     * @returns Instance function of component, or undefined if error
     */
    instance(name: string): any;
    /**
     * Get component
     * @param {String} name Name of component
     * @returns Full component, or undefined if error
     */
    component(name: string): any;
    /**
     * Check if component is active
     * @param {String} name Name of component
     * @returns true/false if active/desactive; or undefined if not exist
     */
    active(name: string): any;
    /**
     * Activate / Deactivate component
     * @param {String} name Name of component
     * @param {Boolean} forceValue Set to true/false if you want to force activate/desactivate plugin
     */
    toggle(name: string, forceValue?: boolean): void;
    /**
     * Get lang data of component
     * @param {String} name Name of component
     * @returns {JSON} Lang data
     */
    lang(name: string): JSON;
    /**
      * Get lang data of default component
      * @returns {JSON} Lang data
      */
    default(): JSON;
    /**
     * Get full list of components
     * @returns List of components
     */
    listComponents(): any;
}
