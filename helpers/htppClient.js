class HttpClient {
	constructor(options = {}) {
		this.baseURL = options.baseURL || '';
		this.headers = options.headers || {};
	}

	setHeader(key, value) {
		this.headers[key] = value;
		return this;
	}

	getHeader(key) {
		return this.headers[key];
	}

	setBasicAuth(username, password) {
		this.headers.Authorization = `Basic ${`${username}:${password}`}`;
		return this;
	}

	setBearerAuth(token) {
		this.headers.Authorization = `Bearer ${token}`;
		return this;
	}

	async httpClientFetchApi(endpoint, options = {}) {
		const response = await fetch(this.baseURL + endpoint, {
			...options,
			headers: this.headers,
		});

		console.log('response in httpClient', response);

		return response;
	}

	httpClientGet(endpoint, options = {}) {
		return this.httpClientFetchApi(endpoint, {
			...options,
			method: 'GET',
		});
	}

	httpClientPost(endpoint, body, options = {}) {
		return this.httpClientFetchApi(endpoint, {
			...options,
			body: JSON.stringify(body),
			method: 'POST',
		});
	}

	httpClientDelete(endpoint, options = {}) {
		return this.httpClientFetchApi(endpoint, {
			parse: false,
			...options,
			method: 'DELETE',
		});
	}

	httpClientPatch(endpoint, operations, options = {}) {
		return this.httpClientFetchApi(endpoint, {
			parse: false,
			...options,
			body: JSON.stringify(operations),
			method: 'PATCH',
		});
	}

	httpClientPut(endpoint, body, options = {}) {
		return this.httpClientFetchApi(endpoint, {
			...options,
			body: body ? JSON.stringify(body) : undefined,
			method: 'PUT',
		});
	}
}

export default HttpClient;
