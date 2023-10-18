export type UserDataType = {
	email: string;
	password: string;
};

export type ResponseUserType = {
	email: string;
	id: number;
	password: string;
	createdAt: string;
	updatedAt: string;
};

export type ResponseUserDataType = {
	token: string;
	user: ResponseUserType;
};

export type UserType = {
	id: number;
	email: string;
	token: string;
};
