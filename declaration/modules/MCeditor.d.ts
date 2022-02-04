declare const _exports: MCeditor;
export = _exports;
declare class MCeditor {
    state: {
        isEdit: boolean;
        link: string;
        fileName: string;
        extension: string;
    };
    /**
     * Open file and return data
     * @param {String} link Path of file
     * @returns {JSON} Return `fileName`, `extension` and `data` in JSON format
     */
    openFile(link: string): JSON;
    /**
     * Overwrite the previously opened file and save the file with new data
     * @param {String} data Data to be saved on the file
     */
    saveFile(data: string): void;
    /**
     * Close file from edition
     */
    closeFile(): void;
}
