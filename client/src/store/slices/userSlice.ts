import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { UserType } from "../../types";

export type UserStateType = {
	user: UserType | null;
	isAuth: boolean;
};

const initialState: UserStateType = {
	user: null,
	isAuth: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
			state.isAuth = true;
		},
		logout: (state) => {
			state.user = null;
			state.isAuth = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const userSelector = (state: RootState) => state.user.user;
export const userAuthSelector = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
