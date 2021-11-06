export = MCsearch;
declare class MCsearch {
    /**
     * @private
     */
    private static BaseImplementation;
    /**
     * Implements a biome search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static biomes(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a block search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static blocks(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a effect search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static effects(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a enchantement search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static enchantements(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a entitie search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static entities(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a item search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static items(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a potion search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static potions(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a structure search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static structures(DOM: Element, MinecraftVersion?: string): string;
    /**
     * Implements a trigger search system via a drop-down menu
     * @param {Element} DOM The Element object in which the search will be inserted
     * @param {String} MinecraftVersion The version of minecraft desired, by default at the highest version supported by Mapcraft
     * @returns Identifier of the inserted element. Be careful, this identifier cannot be retrieved later
     */
    static triggers(DOM: Element, MinecraftVersion?: string): string;
}
