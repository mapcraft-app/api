import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import minecraft from 'minecraft/index';
import { minecraft as version, semverCompare } from 'minecraft/version';
import type { block, minecraftVersion } from 'minecraft/interface';

const currentVersion = process.argv[2] as minecraftVersion ?? version[version.length - 1];
const blocks: any = minecraft.get(currentVersion, 'block');

const main = () => {
	if (!blocks)
		throw new Error('Blocks not founds');

	const id = '__slot__';
	const ret = [ `# Slot ${id} - ${currentVersion}` ];
	const path = resolve('.', '..', 'data_pack', 'data', 'mapcraft', 'functions', 'built_in', 'player', 'get_block');
	const code = (block: string, diff?: string) => `execute if entity @s[nbt={Inventory:[{Slot:${id},id:"minecraft:${block}"}]}] run setblock ~ ~ ~ minecraft:${diff ?? block}`;

	blocks.push(
		{ name: 'lava_bucket' },
		{ name: 'water_bucket' },
	);
	if (semverCompare(currentVersion, '1.19') >= 0)
		blocks.push({ name: 'glow_berries' });

	blocks.sort((a: block, b: block) => {
		const A = a.name.toLowerCase();
		const B = b.name.toLowerCase();
		if (A < B)
			return -1;
		if (A > B)
			return 1;
		return 0;
	});

	for (const block of blocks) {
		switch (block.name) {
		case 'air':
			ret.push(`execute if entity @s[nbt=!{Inventory:[{Slot:${id}}]}] run setblock ~ ~ ~ minecraft:air`);
			break;
		case 'lava_bucket':
			ret.push(code(block.name, 'lava'));
			break;
		case 'powder_snow':
			ret.push(code('powder_snow_bucket', block.name));
			break;
		case 'water_bucket':
			ret.push(code(block.name, 'water'));
			break;
		case 'end_portal':
			ret.push(code('ender_eye', block.name));
			break;
		case 'nether_portal':
			ret.push(code('nether_wart', block.name));
			break;
		case 'sweet_berry_bush':
			ret.push(code('sweet_berries', block.name));
			break;
		case 'glow_berries':
			ret.push(code(block.name, 'cave_vines_plant'));
			break;
		default:
			ret.push(code(block.name));
		}
	}
	writeFile(
		resolve(path, 'slot7b.mcfunction'), `${ret.join('\n').replaceAll(id, '7b')}\n`, { encoding: 'utf-8' }
	);
	writeFile(
		resolve(path, 'slot8b.mcfunction'), `${ret.join('\n').replaceAll(id, '8b')}\n`, { encoding: 'utf-8' }
	);
};

main();
