import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppDispatch } from "./hooks";
import { getTokenFromLS } from "./helpers/LS.helper";
import { AuthService } from "./servises/auth.service";
import { login, logout } from "./store/slices/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const App = () => {
	const dispatch = useAppDispatch();
	const checkAuth = async () => {
		const token = getTokenFromLS();

		try {
			if (token) {
				const data = await AuthService.getProfile();

				if (data) {
					dispatch(login(data));
				} else {
					dispatch(logout());
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);
	return <RouterProvider router={router} />;
};
