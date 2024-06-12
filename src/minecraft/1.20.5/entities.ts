import inheritsEntities from '../1.20/entities';
import type { entities } from '@/types';

export default [
	...inheritsEntities,
	{ name: 'armadillo' }
] as entities[];

