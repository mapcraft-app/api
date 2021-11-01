export = MCwindow;
declare class MCwindow {
    /**
     * Create new instance of window
     * @param {Number} _width Width of window
     * @param {Number} _height Height of window
     * @param {String} _preload Path of preload file, see @link https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
     * @returns {BrowserWindow} Instance of BrowserWindow
     */
    static CreateWindow(_width: number, _height: number, _preload: string): BrowserWindow;
    /**
     * Open window with file
     * @param {BrowserWindow} windowInstance BrowserWindow instance
     * @param {Sting} page Path of file loaded in window
     */
    static OpenWindow(windowInstance: BrowserWindow, page: any): void;
}
import { BrowserWindow } from "electron";
