import { entities } from '../interface';
import inheritsEntities from '../1.19.4/entities';

export default [
	...inheritsEntities,
	{ name: 'camel' },
	{ name: 'sniffer' },

	{ name: 'cherry_boat' },
	{ name: 'cherry_chest_boat' },

	{ name: 'bamboo_raft' },
	{ name: 'bamboo_chest_raft' }
] as entities[];

