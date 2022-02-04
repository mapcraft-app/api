export = MCsearch;
declare class MCsearch {
    /**
     * @private
     */
    private static BaseImplementation;
    /**
     * Implements a biome search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static biomes(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a block search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static blocks(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a block and item search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static blocksItems(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a effect search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static effects(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a enchantement search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static enchantements(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a entitie search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static entities(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a item search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static items(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a potion search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static potions(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a structure search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static structures(dom: Element, minecraftVersion?: string): string;
    /**
     * Implements a trigger search system via a drop-down menu
     * @param {Element} dom The Element object in which the search will be inserted
     * @param {String} minecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static triggers(dom: Element, minecraftVersion?: string): string;
    /**
     * Get value of search system
     * @param {Element} dom Element in which the search system is located
     * @returns Value of search
     */
    static GetValue(dom: Element): any;
    /**
     * Set value of search system
     * @param {Element} dom Element in which the search system is located
     * @param {String} value New value of element
     */
    static SetValue(dom: Element, value: string): void;
}
