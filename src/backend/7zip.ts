import { resolve } from 'path';

export const getModulePath = (): string => {
	if (process.env.PACKAGED && process.env.PACKAGED === 'true') {
		if (process.env.APP)
			return resolve(process.env.APP, '..', 'app.asar.unpacked', 'node_modules', 'mapcraft-api', 'node_modules', '7zip-min');
		return resolve(__dirname, '..', '..', '..', '..', 'app.asar.unpacked', 'node_modules', 'mapcraft-api', 'node_modules', '7zip-min');
	}
	return '7zip-min';
};
const __module__import: typeof import('7zip-min') = require(getModulePath());

export default __module__import;
