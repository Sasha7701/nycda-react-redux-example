// Don't ever do this! This should be in a .env file!
const API_KEY = "170da09b425a494eb44809b46bcc00d5";

export default {
	BASE_PATH: "https://api.giphy.com/v1",

	/**
	 * Fires a request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - A set of options for the request
	 * @param {string} options.method - GET, POST, PUT, or DELETE
	 * @param {object} options.args - Object of arguments to send
	 * @param {object} options.headers - Any additional headers to send
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	request(path, options) {
		// Setup some defaults
		const method = options.method ? options.method.toUpperCase() : "GET";
		let args = options.args || {};
		let body = null;
		let query = "";
		const headers = {
			accept: "application/json",
			...options.headers || {},
		};

		// Add API key to args
		args = {
			...args,
			api_key: API_KEY,
		};

		if (method === "POST" || method === "PUT") {
			// For POST and PUTs, send args as JSON body
			body = JSON.stringify(args);
			headers["Content-Type"] = "application/json";
		}
		else {
			// For anything else, send args as query params
			query = "?" + Object.keys(args).map((key) => {
				return `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`;
			}).join("&");
		}

		// Construct and return the fetch
		return fetch(this.BASE_PATH + path + query, {
			method,
			headers,
			body,
			mode: "cors",
		}).then((res) => {
			return res.json();
		}).catch((err) => {
			console.error("Uncaught error:", err);
		});
	},

	/**
	 * Fires a GET request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	get(path, options) {
		return this.request(path, { ...options, method: "GET" });
	},

	/**
	 * Fires a POST request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	post(path, options) {
		return this.request(path, { ...options, method: "POST" });
	},

	/**
	 * Fires a PUT request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	put(path, options) {
		return this.request(path, { ...options, method: "PUT" });
	},

	/**
	 * Fires a DELETE request at the API
	 * @param {string} path - Path of the request, with starting /
	 * @param {object} options - See request for all options
	 * @returns {Promise} Fetch promise, resolves with JSON
	 */
	delete(path, options) {
		return this.request(path, { ...options, method: "DELETE" });
	},
};
