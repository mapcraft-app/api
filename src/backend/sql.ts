import databaseConstrutor, { Database, RunResult, Statement } from 'better-sqlite3';
import { resolve } from 'path';
import { envInterface, tableInterface } from '@/types';

export default class {
	public db: Database;
	public tables: tableInterface[];

	constructor(
		env: envInterface,
		name: string,
		verb: ((message: any, ...optional: any[]) => void) | undefined = undefined,
		tables: tableInterface | tableInterface[] | undefined = undefined
	) {
		const toto = resolve(env.save, name, 'mapcraft.db');
		console.log(toto);
		this.db = new databaseConstrutor(
			toto,
			{ timeout: 250, verbose: verb }
		);
		console.log('one');
		if (tables) {
			this.tables = Array.isArray(tables)
				? tables
				: [ tables ];
		} else
			this.tables = [];
		console.log('two');
		for (const table of this.tables)
			this.db.exec(table.sql);
		console.log('three');
	}

	isExistTable(names: string | string[]): number | number[] {
		if (Array.isArray(names)) {
			const ret: number[] = [];
			for (const x in names)
				ret.push(this.tables.findIndex((el) => el.name === names[x]));
			return ret;
		}
		return [ this.tables.findIndex((el) => el.name === names) ];
	}

	addTable(tables: tableInterface | tableInterface[]): void {
		if (Array.isArray(tables)) {
			for (const el of tables) {
				this.tables.push(el);
				this.db.exec(el.sql);
			}
		} else {
			this.tables.push(tables);
			this.db.exec(tables.sql);
		}
	}

	updateTable(tables: tableInterface | tableInterface[]): void {
		if (Array.isArray(tables)) {
			for (const table of tables) {
				const x = this.isExistTable(table.name) as number;
				if (x) {
					this.tables[x].sql = table.sql;
					this.db.exec(table.sql);
				}
			}
		} else {
			const x = this.isExistTable(tables.name) as number;
			if (x) {
				this.tables[x].sql = tables.sql;
				this.db.exec(tables.sql);
			}
		}
	}

	removeTable(names: string | string[]): void {
		if (Array.isArray(names)) {
			for (const name of names) {
				const x = this.isExistTable(name) as number;
				if (x) {
					this.tables.splice(x, 1);
					this.db.exec(`DROP TABLE ${this.tables[x].name}`);
				}
			}
		} else {
			const x = this.isExistTable(names) as number;
			if (x) {
				this.tables.splice(x, 1);
				this.db.exec(`DROP TABLE ${this.tables[x].name}`);
			}
		}
	}

	/**
	 * Check if the database is available to perform transactions
	 */
	async check(): Promise<void> {
		return new Promise((res, rej) => {
			try {
				this.db
					.prepare('SELECT tbl_name FROM sqlite_schema')
					.get();
				return res();
			} catch (e) {
				return rej(e);
			}
		});
	}

	/**
	 * Prepare request
	 */
	prepare(req: string): Statement<any[]> {
		return this.db.prepare(req);
	}

	/**
	 * Exec sql, like SELECT, INSERT INTO, ...
	 */
	get(req: string, ...args: any[]): Promise<any> {
		return new Promise((res, rej) => {
			try {
				const __sql = this.db.prepare(req);
				res(__sql.get(...args));
			} catch (e) {
				rej(e);
			}
		});
	}

	/**
	 * Exec all sql, like SELECT, INSERT INTO, ...
	 */
	all(req: string, ...args: any[]): Promise<any[]> {
		return new Promise((res, rej) => {
			try {
				const __sql = this.db.prepare(req);
				res(__sql.all(...args));
			} catch (e) {
				rej(e);
			}
		});
	}

	/**
	 * Iterate throw data
	 */
	iterate(req: string, ...args: any[]): IterableIterator<any> {
		const __sql = this.db.prepare(req);
		return __sql.iterate(...args);
	}

	/**
	 * Update data (UPDATE hello FROM ...)
	 */
	update(req: string, ...args: any[]): Promise<RunResult> {
		return new Promise((res, rej) => {
			try {
				const __sql = this.db.prepare(req);
				res(__sql.run(...args));
			} catch (e) {
				rej(e);
			}
		});
	}
}
