import { FC } from "react";
import { TransactionForm } from "../components/TransactionForm";
import {
	CategoryType,
	ResponseTransactionLoaderType,
	TransactionType,
} from "../types";
import { instance } from "../api/axios.api";
import { toast } from "react-toastify";
import { TransactionTable } from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { formatToRub } from "../helpers/currency.helper";
import { Chart } from "../components/Chart";

export const transactionLoader = async () => {
	const categories = await instance.get<Array<CategoryType>>("/categories");
	const transactions =
		await instance.get<Array<TransactionType>>("/transaction");
	const totalIncome = await instance.get<number>("/transaction/income/find");
	const totalExpense = await instance.get<number>("/transaction/expense/find");
	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	};
	return data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case "DELETE": {
			const formData = await request.formData();
			const transactionId = formData.get("id");
			await instance.delete(`/transaction/transaction/${transactionId}`);

			toast.success("Транзакция была удалена");

			return null;
		}
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
	}
};

export const Transactions: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as ResponseTransactionLoaderType;
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
								{formatToRub.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className='text-md text-center font-bold uppercase'>Расходы</p>
							<p className='rounded-sm p-1 bg-red-500 mt-2 text-center'>
								{formatToRub.format(totalExpense)}
							</p>
						</div>
					</div>
					<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
				{/* Transactions table*/}
			</section>
			<section className='mt-4'>
				<h2 className='text-xl'>Таблица</h2>
				<TransactionTable limit={5} />
			</section>
		</>
	);
};
