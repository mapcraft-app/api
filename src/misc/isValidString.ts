/**
 * Returns a Boolean value that indicates if string is valid in Minecraft format
 * @param {string} str String to check
 * @returns false if the string contains an unauthorized character
 */
export default (str: string): boolean => /[^-a-z0-9_/.]+/gm.test(str);
