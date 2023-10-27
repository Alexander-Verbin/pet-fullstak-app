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

export type CategoryType = {
	title: string;
	id: number;
	createdAt: string;
	updatedAt: string;
	transactions: [];
};

export type TransactionCategoryType = {
	id: number;
	title: string;
	createdAt: string;
	updatedAt: string;
};

export type TransactionType = {
	id: number;
	title: string;
	type: "income" | "expense";
	amount: number;
	createdAt: string;
	updatedAt: string;
	category: TransactionCategoryType;
};

export type ResponseTransactionLoaderType = {
	categories: Array<CategoryType>;
	transactions: Array<TransactionType>;
	totalIncome: number;
	totalExpense: number;
};
