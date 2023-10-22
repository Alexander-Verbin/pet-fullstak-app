import { FC, useState } from "react";
import { AuthService } from "../servises/auth.service";
import { toast } from "react-toastify";
import { setTokenToLS } from "../helpers/LS.helper";
import { useAppDispatch } from "../hooks";
import { login } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Auth: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthService.registration({ email, password });

			if (data) {
				toast.success("Аккаунт создан");
				setIsLogin(!isLogin);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message;

			toast.error(error.toString());
		}
	};

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data = await AuthService.login({ email, password });

			if (data) {
				setTokenToLS("token", data.token);
				dispatch(login(data));
				navigate("/");
				toast.success("Вы вошли в аккаунт");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message;

			toast.error(error.toString());
		}
	};
	return (
		<div className='mt-40 flex flex-col justify-center items-center bg-slate-900 text-white'>
			<h1 className='mb-10 text-center text-xl'>
				{isLogin ? "Вход" : "Регистрация"}
			</h1>
			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className='flex flex-col gap-5 mx-auto w-1/3 '>
				<input
					type='email'
					className='input'
					placeholder='Email'
					name='Email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					className='input'
					placeholder='Пароль'
					name='Password'
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit' className='btn btn-green mx-auto'>
					{isLogin ? "Войти" : "Зарегистрироваться"}
				</button>
			</form>
			<div className='flex justify-center mt-5'>
				<button
					onClick={() => setIsLogin(!isLogin)}
					className='text-slate-300 hover:text-white'>
					{isLogin ? "Ещё нет аккаунта?" : "Уже есть аккаунт?"}
				</button>
			</div>
		</div>
	);
};
