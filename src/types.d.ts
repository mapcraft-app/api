export declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DEV: string,
			PACKAGED: string,
			APP: string,
			APP_DATA: string,
			GAME: string,
			LOG: string,
			DATE: string,
			SAVE_GAME: string,
			RESOURCE_GAME: string,
			TEMP: string
		}
	}
}
