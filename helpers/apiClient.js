import HttpClient from './htppClient';

class ApiClient extends HttpClient {
	constructor(options) {
		super(options);
	}

	async fetchApi(endpoint, options = {}) {
		const response = await this.httpClientFetchApi(endpoint, options);

		if (response && response.status === 401) {
			this.onAuthorizeError();
		} else if (response && response.status >= 500) {
			this.onServerInternalError();
		}

		console.log('response in apiClient', response);

		if (!response.ok) throw new Error(response.statusText);

		if (options.parse !== false && response.status !== 204) {
			return response.json();
		}
		return response;
	}

	onAuthorizeError() {
		//  maybe you want to redirect user or clear storage...
		console.log('onAuthorizeError');
	}

	onServerInternalError() {
		//  maybe you want to redirect user or clear storage...
		console.log('onServerInternalError');
	}

	get(endpoint, options = {}) {
		return this.fetchApi(endpoint, {
			...options,
			method: 'GET',
		});
	}

	post(endpoint, body, options = {}) {
		return this.fetchApi(endpoint, {
			...options,
			method: 'POST',
			body: JSON.stringify(body),
		});
	}

	delete(endpoint, options = {}) {
		return this.fetchApi(endpoint, {
			parse: false,
			...options,
			method: 'DELETE',
		});
	}

	patch(endpoint, operations, options = {}) {
		return this.fetchApi(endpoint, {
			parse: false,
			...options,
			body: JSON.stringify(operations),
			method: 'PATCH',
		});
	}

	put(endpoint, body, options = {}) {
		return this.fetchApi(endpoint, {
			...options,
			body: body ? JSON.stringify(body) : undefined,
			method: 'PUT',
		});
	}
}

export default ApiClient;
