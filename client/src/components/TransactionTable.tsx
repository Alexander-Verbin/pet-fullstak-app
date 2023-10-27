import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { ResponseTransactionLoaderType, TransactionType } from "../types";
import { formatDate } from "../helpers/date.helper";
import { formatToRub } from "../helpers/currency.helper";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";

type PropsType = {
	limit?: number;
};

export const TransactionTable: FC<PropsType> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as ResponseTransactionLoaderType;

	const [data, setData] = useState<Array<TransactionType>>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(
			`/transaction/pagination?page=${page}&limit=${limit}`
		);
		setData(response.data);
		setTotalPages(Math.ceil(transactions.length / limit));
	};

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1);
	};

	useEffect(() => {
		fetchTransactions(currentPage);
	}, [currentPage, transactions]);

	return (
		<>
			<ReactPaginate
				className='flex gap-3 justify-end mt-4 items-center'
				activeClassName='bg-blue-600 rounded-md'
				pageLinkClassName='text-white text-xs py-1 px-2 rounded-md'
				previousClassName='text-white py-1 px-2 rounded-md bg-slate-800 text-xs'
				nextClassName='text-white py-1 px-2 rounded-md bg-slate-800 text-xs'
				disabledClassName='text-white/50 cursor-not-allowed'
				disabledLinkClassName='text-slate-600 cursor-not-allowed'
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
			/>
			<div className='mt-4 bg-slate-800 px-4 py-3 rounded-md'>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Транзакция</td>
							<td className='font-bold'>Количество (&#8381;)</td>
							<td className='font-bold'>Категория</td>
							<td className='font-bold'>Дата</td>
							<td className='text-right'>Действия</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((transaction, index) => (
							<tr key={transaction.id}>
								<td>{index + 1}</td>
								<td>{transaction.title}</td>
								<td
									className={
										transaction.type === "income"
											? "text-green-500"
											: "text-rose-600"
									}>
									{transaction.type === "income"
										? `+ ${formatToRub.format(transaction.amount)}`
										: `- ${formatToRub.format(transaction.amount)}`}
								</td>
								<td>{transaction.category?.title || "Прочее"}</td>
								<td>{formatDate(transaction.createdAt)}</td>
								<td>
									<Form method='delete' action='/transactions'>
										<input type='hidden' name='id' value={transaction.id} />
										<button type='submit' className='btn hover:btn-red ml-auto'>
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
