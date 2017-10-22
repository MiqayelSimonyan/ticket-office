export default class Auth {
	static authenticate(name, token) {
		localStorage.setItem(name, token);
	}

	static isAuthenticated(name) {
		return localStorage.getItem(name) !== null;
	}

	static deAuthenticate(name) {
		localStorage.removeItem(name);
	}

	static getToken(name) {
		return localStorage.getItem(name);
	}
}