import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const Layuot: FC = () => {
	return (
		<div className='min-h-screen bg-slate-900 font-roboto text-white pb20'>
			<Header />
			<main className='container'>
				<Outlet />
			</main>
		</div>
	);
};
