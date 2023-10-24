import { FC } from "react";
import { Form } from "react-router-dom";

type PropsType = {
	type: "POST" | "PATCH";
	id?: number;
	setVisibleModal: (visibleModal: boolean) => void;
};

export const CategoryModal: FC<PropsType> = ({ type, id, setVisibleModal }) => {
	return (
		<div className='fixed top-0 left-0 right-0 w-full h-full bg-black/50 flex justify-center items-center'>
			<Form
				action='/categories'
				method={type}
				onSubmit={() => setVisibleModal(false)}
				className='grid gap-2 w-[300px] bg-slate-900 p-5 rounded-md'>
				<label htmlFor='title'>
					<small>Категория</small>
					<input
						className='input w-full'
						type='text'
						name='title'
						placeholder='Введите название категории'
					/>
					<input type='hidden' name='id' value={id} />
				</label>
				<div className='flex items-center gap-2'>
					<button className='btn btn-green' type='submit'>
						{type === "PATCH" ? "Сохранить" : "Создать"}
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						className='btn btn-red'
						type='button'>
						Закрыть
					</button>
				</div>
			</Form>
		</div>
	);
};
