import inheritsEntities from '../1.20/entities';
import type { entities } from '@/types';

export default [
	...inheritsEntities,
	{ name: 'bogged' },
	{ name: 'breeze' },
	{ name: 'breeze_wind_charge' }
] as entities[];

