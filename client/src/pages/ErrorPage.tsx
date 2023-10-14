import { FC } from "react";
import image from "../assets/404.webp";
import { Link } from "react-router-dom";

export const ErrorPage: FC = () => {
	return (
		<div className='min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
			<h1 className='text-5xl'>Страница не найдена</h1>
			<img
				src={image}
				alt='404 page'
				loading='lazy'
				decoding='async'
				className='w-2/4 object-contain'
			/>
			<Link
				className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-700'
				to={"/"}>
				Вернуться на главную
			</Link>
		</div>
	);
};
