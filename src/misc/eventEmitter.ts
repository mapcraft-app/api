/**
 * Custom event emitter created for bypass electron protection in frontend
 */
export default class {
	private events: Record<string, any>;
	
	constructor() {
		this.events = {};
	}

	addListener(event: string, listener: (args: any[]) => any): void {
		const events = this.events;
		if (typeof listener === 'function') {
			if (Object.prototype.hasOwnProperty.call(this.events, event) && Array.isArray(this.events[event]))
				this.listeners(event).push(listener);
			else 
				events[event] = [listener]; 
		}
	}

	on(event: string, listener: (args: any[]) => any): void {
		this.addListener(event, listener);
	}

	removeListener(event: string, listener: (args: any[]) => any): void {
		const events = this.events;
		let listeners;
		let listenerString;
		if (typeof listener === 'function' &&
			Object.prototype.hasOwnProperty.call(this.events, event) &&
      Array.isArray(events[event])) {
			listeners = this.listeners(event);
			listenerString = listener.toString();
			for (let i = 0; i < listeners.length; i++) {
				if (listeners[i].toString() === listenerString) 
					listeners.splice(i, 1);
			}
		}
	}

	removeAllListeners(event: string): void {
		const events = this.events;
		if (Object.prototype.hasOwnProperty.call(this.events, event)) 
			events[event] = [];
		
	}

	emit(event: string, ...args: any[]): void {
		const events = this.events;
		let listeners;

		if (Object.prototype.hasOwnProperty.call(this.events, event) &&
			Array.isArray(events[event])) {
			listeners = this.listeners(event).slice();
			for (let i = 0; i < listeners.length; i++) {
				if (listeners[i]) 
					listeners[i].apply(this, args);
			}
		}
	}

	once(event: string, listener: (args: any) => any): void {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const emitter = this;
		this.on(event, function listenerWrapper(...args) {
			emitter.removeListener(event, listenerWrapper);
			listener.apply(emitter, args);
		});
	}

	listeners(event: string): any[] {
		return (Object.prototype.hasOwnProperty.call(this.events, event))
			? this.events[event]
			: [];
	}
}
