import type { block } from '@/types';
import inheritBlock from '../1.20/blocks';

const list = [
	...inheritBlock,
] as block[];
const grassId = list.findIndex((e) => e.name === 'grass');
if (grassId > -1)
	list[grassId].name = 'short_grass';

export default list;
