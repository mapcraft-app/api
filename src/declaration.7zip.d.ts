declare module '7zip-min' {
	/**
	 * Unpack archive.
	 * @param {string} pathToPack - path to archive you want to unpack.
	 * @param {string} destPathOrCb - destination path, where to unpack.
	 * @param {function} [cb] - callback function. Will be called once unpack is done. If no errors, first parameter will contain `null`
	*/
	function unpack(pathToPack: string, destPathOrCb: string | function, cb: (err?: Error) => void);

	/**
	 * Unpack archive.
	 * @param {string} pathToPack - path to archive you want to unpack.
	 * @param {function} destPathOrCb - callback function. Will be called once unpack is done. If no errors, first parameter will contain `null`
	*/
	function unpack(pathToPack: string, cb: (err?: Error) => void);

	/**
	 * Pack file or folder to archive.
	 * @param {string} pathToSrc - path to file or folder you want to compress.
	 * @param {string} pathToDest - path to archive you want to create.
	 * @param {function} cb - callback function. Will be called once pack is done. If no errors, first parameter will contain `null`.
	*/
	function pack(pathToSrc: string, pathToDest: string, cb: (err?: Error) => void);

	/**
	 * Get an array with compressed file contents.
	 * @param {string} pathToSrc - path to file its content you want to list.
	 * @param {function} cb - callback function. Will be called once list is done. If no errors, first parameter will contain `null`.
	 */
	function list(pathToSrc: string, cb: (err?: Error) => void);

	/**
	* Run 7za with parameters specified in `paramsArr`.
	* @param {string[]} paramsArr - array of parameter. Each array item is one parameter.
	* @param {function} cb - callback function. Will be called once command is done. If no errors, first parameter will contain `null`. If no output, second parameter will be `null`.
	*/
	function cmd(paramsArr: string[], cb: (err?: Error, output?: any) => void);
}
