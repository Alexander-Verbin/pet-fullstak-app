import { instance } from "../api/axios.api";
import { UserDataType, ResponseUserDataType, UserType } from "./../types/index";
export const AuthService = {
	async registration(
		userData: UserDataType
	): Promise<ResponseUserDataType | undefined> {
		const { data } = await instance.post<ResponseUserDataType>(
			"user",
			userData
		);

		return data;
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async login(userData: UserDataType): Promise<UserType | undefined> {
		const { data } = await instance.post<UserType>("auth/login", userData);

		return data;
	},
	async getProfile(): Promise<UserType | undefined> {
		const { data } = await instance.get<UserType>("auth/profile");

		if (data) return data;
	},
};
