export = link;
declare const link: MClink;
declare class MClink {
    _components: any[];
    /**
     * Add component to list
     * @param {String} component
     */
    addComponent(component: string): void;
    /**
     * Remove component to list
     * @param {String} component
     */
    removeComponent(component: string): void;
    /**
     * Get array of every component(s)
     * @returns {Array} Array of component(s)
     */
    getComponents(): any[];
    /**
     * Clean component(s)
     */
    cleanComponents(): void;
}
