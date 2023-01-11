import { resolve } from 'path';

let __module__import: typeof import('7zip-min') | undefined = undefined;

export const getModulePath = (): string => {
	if (process.env.PACKAGED) {
		if (process.env.APP)
			return resolve(process.env.APP, '..', 'app.asar.unpacked', 'node_modules', 'mapcraft-api', 'node_modules', '7zip-bin');
		return resolve(__dirname, '..', '..', '..', '..', 'app.asar.unpacked', 'node_modules', 'mapcraft-api', 'node_modules', '7zip-bin');
	}
	return '7zip-min';
};

export default (): Promise<typeof import('7zip-min')> => {
	return new Promise((res, rej) => {
		if (__module__import)
			res(__module__import);
		import(getModulePath())
			.then((d) => d.default)
			.then((d) => {
				__module__import = d;
				res(d);
			})
			.catch((e) => rej(e));
	});
};
