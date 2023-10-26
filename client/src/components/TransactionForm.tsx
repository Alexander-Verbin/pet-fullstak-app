import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { ResponseTransactionLoaderType } from "../types";
import { CategoryModal } from "./CategoryModal";

export const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as ResponseTransactionLoaderType;
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	return (
		<>
			<div className=' rounded-md bg-slate-800 p-4'>
				<Form className='grid gap-2' method='post' action='/transactions'>
					<label className='grid gap-1' htmlFor='title'>
						<span>Название транзакции</span>
						<input
							className='input border-slate-700'
							type='text'
							placeholder='Введите название'
							name='title'
							required
						/>
					</label>
					<label className='grid gap-1' htmlFor='amount'>
						<span>Сумма транзакции</span>
						<input
							className='input border-slate-700'
							type='number'
							placeholder='Введите сумму'
							name='amount'
							required
						/>
					</label>
					{/* Select */}

					{categories.length ? (
						<label htmlFor='category' className='grid gap-1'>
							<span>Категории</span>
							<select
								className='input border-slate-700'
								name='category'
								required>
								{categories.map((category) => (
									<option
										className='text-slate-800'
										value={category.id}
										key={category.id}>
										{category.title}
									</option>
								))}
							</select>
						</label>
					) : (
						<span className='mt-1 text-red-300'>
							Что бы продолжить, создайте категорию
						</span>
					)}
					{/* Add category */}
					<button
						onClick={() => setVisibleModal(true)}
						type='button'
						className='max-w-fit flex items-center gap-2 text-white/50 hover:text-white'>
						<FaPlus />
						<span>Управление категориями</span>
					</button>
					{/* Radio buttons */}
					<fieldset className='flex gap-4 items-center' role='radiogroup'>
						<label className='cursor-pointer flex items-center gap-2'>
							<input
								className='form-radio text-blue-600'
								type='radio'
								name='type'
								value={"income"}
							/>
							<span>Доход</span>
						</label>
						<label className='cursor-pointer flex items-center gap-2'>
							<input
								className='form-radio text-blue-600'
								type='radio'
								name='type'
								value={"expense"}
							/>
							<span>Расход</span>
						</label>
					</fieldset>
					{/* Submit Button */}
					<button type='submit' className='btn btn-green max-w-fit mt-2'>
						Создать транзакцию
					</button>
				</Form>
			</div>
			{visibleModal && (
				<CategoryModal type='post' setVisibleModal={setVisibleModal} />
			)}
		</>
	);
};
