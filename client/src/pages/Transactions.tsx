import { FC } from "react";
import { TransactionForm } from "../components/TransactionForm";
import { CategoryType } from "../types";
import { instance } from "../api/axios.api";
import { toast } from "react-toastify";

export const transactionLoader = async () => {
	const categories = await instance.get<Array<CategoryType>>("/categories");
	const data = {
		categories: categories.data,
	};
	return data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData();
			const newTransaction = {
				title: formData.get("title"),
				type: formData.get("type"),
				amount: +formData.get("amount"),
				category: formData.get("category"),
			};
			await instance.post("/transaction", newTransaction);
			toast.success("Тракция добавлена");
			return null;
		}
		// case "DELETE": {
		// 	const formData = await request.formData();
		// }
	}
};

export const Transactions: FC = () => {
	return (
		<>
			<section className='grid grid-cols-3 gap-4 mt-4 items-start'>
				{/* Add transaction form*/}
				<div className='grid col-span-2'>
					<TransactionForm />
				</div>
				{/* Statistic blocks*/}
				<div className='rounded-md bg-slate-800 p-3'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='text-md text-center font-bold uppercase'>Доходы</p>
							<p className='rounded-sm p-1 bg-green-600 mt-2 text-center'>
								1000&#8381;
							</p>
						</div>
						<div>
							<p className='text-md text-center font-bold uppercase'>Расходы</p>
							<p className='rounded-sm p-1 bg-red-500 mt-2 text-center'>
								1000&#8381;
							</p>
						</div>
					</div>
					<>cart</>
				</div>
				{/* Transactions table*/}
				<h1 className='my-5'>Таблица</h1>
			</section>
		</>
	);
};
