import { formating } from '../misc';

export default (name: string, version: string): void => {
	console.log(`${formating.format.underline}${formating.foreground.normal.cyan}${name}\
	${formating.format.reset} version \
	${formating.foreground.normal.green}${version}${formating.format.reset}`);
};
