import lastEntites from '../1.19/entities';
import type { entities } from '@/types';

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
