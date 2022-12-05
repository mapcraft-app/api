import databaseConstrutor, { Database, Statement } from 'better-sqlite3';
import { resolve } from 'path';
import { envInterface } from './engine/interface';

export interface tableInterface {
	name: string;
	sql: string;
}

export default class {
	public db: Database;
	public tables: tableInterface[];

	constructor(env: envInterface, name: string, verb: ((message: any, ...optional: any[]) => void) | undefined = undefined, tables: tableInterface[] | undefined = undefined) {
		this.db = new databaseConstrutor(resolve(env.save, name, 'mapcraft.db'), { verbose: verb });
		this.tables = tables ?? [];
		for (const table of this.tables)
			this.db.exec(table.sql);
	}

	isExistTable(names: string | string[]): number | number[] {
		if (Array.isArray(names)) {
			const ret: number[] = [];
			for (const x in names)
				ret.push(this.tables.findIndex((el) => el.name === names[x]));
			return ret;
		}
		return [this.tables.findIndex((el) => el.name === names)];
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

	prepare(req: string): Statement<any[]> {
		return this.db.prepare(req);
	}

	exec(req: string, ...args: any[]): Promise<any> {
		return new Promise((res, rej) => {
			try {
				const __sql = this.db.prepare(req);
				const data = __sql.get(...args);
				res(data);
			} catch (e) {
				rej(e);
			}
		});
	}
}
