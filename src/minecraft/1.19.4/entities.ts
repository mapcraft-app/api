import lastEntites from '../1.19/entities';
import { entities } from '../interface';

export default [
	...lastEntites,
	{
		name: 'block_display'
	},
	{
		name: 'item_display'
	},
	{
		name: 'text_display'
	}
] as entities[];
