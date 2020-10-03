const TOKEN_NAME = "plantuml-doc-integration-token-v1";
const REDIRECT_DOCID_NAME = "plantuml-doc-integration-redirect-docid";

const create = (storage, name) => {
	const store = (obj) => {
		storage.setItem(name, JSON.stringify(obj));
	}

	const load = () => {
		const string = storage.getItem(name);
		if (string === null) return null;
		return JSON.parse(string);
	}

	const clear = () => {
		storage.removeItem(name);
	}

	const exists = () => {
		return storage.getItem(name) !== null;
	}
	return { store, load, clear, exists };
}
export const tokenStore = create(localStorage, TOKEN_NAME);
export const redirectDocIdStore = create(localStorage, REDIRECT_DOCID_NAME);
