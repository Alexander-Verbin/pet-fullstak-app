export const getTokenFromLS = (): string => {
	const data = localStorage.getItem("token");
	const token: string = data ? JSON.parse(data) : "";

	return token;
};

export const setTokenToLS = (key: string, token: string): void => {
	localStorage.setItem(key, JSON.stringify(token));
};

export const removeTokenFromLS = (key: string): void => {
	localStorage.removeItem(key);
};
