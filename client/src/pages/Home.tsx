import { FC } from "react";

export const Home: FC = () => {
	return (
		<section className='mt-4'>
			<h1 className='text-5xl text-white text-center'>
				Это приложение по подсчёту финансов
				<br />
				Стек: TypeScript, React, Tailwind, Nest, PostgresSQL
			</h1>
		</section>
	);
};
