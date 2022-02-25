export = Template;
declare class Template {
    /**
     * Folder in which all template files of the module are placed
     * @param {String} directory Relative link of the file to the module
     * @param {String} preGenerateID (Optional) Force the use of its own template identifier. Be careful if this function is badly used it can generate many strange problems
     */
    constructor(directory: string, preGenerateID?: string);
    directory: string;
    preGenerateID: string;
    DIRMAIN: string;
    DIRFile: string;
    DIRLink: string;
    CSSFile: string;
    CSSLink: string;
    JSFile: string;
    JSLink: string;
    LOCKFile: string;
    LOCKLink: string;
    /**
     * Render template in Element
     * @param {Element} DOMelement Element on which the elements will be added
     * @param {String} template Name of template file with extension
     * @param {JSON} args Valid json for replace variable(s)
     */
    render(DOMelement: Element, template: string, args: JSON): void;
    /**
     * Get raw of template HTML
     * @param {String} template Name of template file with extension
     * @returns Raw of HTML template
     */
    getRaw(template: string): string;
    /**
     * Render generated elements in raw formats; data must be valid HTML
     * @param {Element} DOMelement Element on which the elements will be added
     * @param {String} rawHTML HTML raw
     * @param {String} template Name of template file with extension
     * @param {JSON} args Valid json for replace variable(s)
     */
    renderRaw(DOMelement: Element, rawHTML: string, template: string, args: JSON): void;
    /**
     * Parse HTML raw with variable(s)
     * @param {String} HTML HTML raw
     * @param {JSON} args Valid json for replace variable(s)
     */
    parseRaw(HTML: string, args: JSON): string;
    /**
     * Update lang of specific Element
     * @param {Element} DOMelement Element of DOM
     * @param {JSON} args Valid json for replace variable(s)
     */
    updateLang(DOMelement: Element, args: JSON): void;
    /**
     * Correctly clean Node (https://developer.mozilla.org/en-US/docs/Web/API/Node)
     * @param {Element} node Node to be removed
     * @param {Boolean} removeParent If true, function remove node after delete child. false by default
     */
    cleanNode(node: Element, removeParent?: boolean): void;
    /**
     * Clean render
     * @private
     */
    private _cleanRender;
    /**
     * Clean includes
     * @private
     */
    private _cleanIncludes;
    /**
     * Clean template
     * @private
     */
    private _insertTemplate;
    /**
     * Includes
     * @private
     */
    private _includes;
    /**
     * Check if DOMelement is live or not
     * @private
     */
    private _ifDOMelementIsLive;
    /**
     * Iterate on the list
     * @private
     */
    private _iterateNodeList;
}
