import http from 'http';
import https from 'https';
import type { fetchResponse } from '@/types';

export default function fetch(url: string): Promise<fetchResponse> {
	return new Promise((res, rej) => {
		const httpMethod = (url.indexOf(('https://')) !== -1)
			? https
			: http;
		httpMethod.get(url, (response) => {
			let body = '';
			response.on('data', (chunk) => body += chunk);
			response.on('end', () => res({
				body,
				headers: response.headers,
				status: response.statusCode ?? 200,
				statusText: http.STATUS_CODES[response.statusCode ?? 200],
				json: () => JSON.parse(body)
			}));
		})
			.on('error', (err) => rej(err));
	});
}
