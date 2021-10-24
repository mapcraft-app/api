export = Template;
declare class Template {
    /**
     * Folder in which all template files of the module are placed
     * @param {string} directory Relative link of the file to the module
     */
    constructor(directory: string);
    directory: string;
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
     * Render template in DOMelement
     * @param {DOMelement} DOMelement DOMelement on which the elements will be added
     * @param {string} template Name of template file with extension
     * @param {json} args Valid json for replace variable(s)
     */
    render(DOMelement: any, template: string, args: any): void;
    /**
     * Get raw of template HTML
     * @param {string} template Name of template file with extension
     * @returns Blob raw of HTML template
     */
    getRaw(template: string): string;
    /**
     * Render generated elements in raw formats; data must be valid HTML
     * @param {DOMelement} DOMelement DOMelement on which the elements will be added
     * @param {string} rawHTML HTML raw
     * @param {string} template Name of template file with extension
     * @param {JSON} args Valid json for replace variable(s)
     */
    renderRaw(DOMelement: any, rawHTML: string, template: string, args: JSON): void;
    /**
     * Parse HTML raw with variable(s)
     * @param {string} HTML HTML raw
     * @param {json} args Valid json for replace variable(s)
     */
    parseRaw(HTML: string, args: any): string;
    /**
     * Update lang of specific DOMelement
     * @param {DOMelement} DOMelement DOMelement of DOM
     * @param {json} args Valid json for replace variable(s)
     */
    updateLang(DOMelement: any, args: any): void;
    /**
     * Correctly clean child of element
     * @param {DOMelement} node DOMelement
     * @param {boolean} RemoveParent If true, function remove node after delete child. false by default
     */
    cleanNode(node: any, RemoveParent?: boolean): void;
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
