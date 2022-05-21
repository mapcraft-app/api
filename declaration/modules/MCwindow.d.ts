export = MCwindow;
declare class MCwindow {
    /**
     * Create new instance of window
     * @param {Number} width Width of window
     * @param {Number} height Height of window
     * @param {String} preload Path of preload file, see @link https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
     * @param {String} icon Path to window icon, default to Mapcraft icon
     * @returns {BrowserWindow} Instance of BrowserWindow
     */
    static createWindow(width: number, height: number, preload: string, icon?: string): BrowserWindow;
    /**
     * Open window with file
     * @param {BrowserWindow} windowInstance BrowserWindow instance
     * @param {String} page Path of file loaded in window
     * @param {Boolean} devTools Open dev tools in window
     */
    static openWindow(windowInstance: BrowserWindow, page: string, devTools?: boolean): void;
}
import { BrowserWindow } from "electron";
