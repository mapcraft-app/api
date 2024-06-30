import { enchantement } from '@/types';

export default [
	{
		id: 'breach',
		description: 'Reduces the effectiveness of the armor of attacked entities',
		level: [ 1,
			4 ]
	},
	{
		id: 'density',
		description: 'Increases the amount of damage dealt per block fallen',
		level: [ 1,
			5 ]
	},
	{
		id: 'wind_burst',
		description: 'Creates a powerful upwards knockback effect upon executing a smash attack',
		level: [ 1,
			3 ]
	}
] as enchantement[];
