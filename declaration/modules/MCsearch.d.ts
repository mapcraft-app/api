export = MCsearch;
declare class MCsearch {
    /**
     * Implements a block search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static BLOCKS(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a enchantement search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static ENCHANTEMENTS(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a entitie search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static ENTITIES(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a item search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static ITEMS(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a potion search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static POTIONS(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a trigger search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static TRIGGER(DOM: Element, MinecraftVersion?: string): string;
}
