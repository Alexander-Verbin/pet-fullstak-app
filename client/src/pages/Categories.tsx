import { FC, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { CategoryModal } from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { CategoryType } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const categoriesActions = async ({ request }: any) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData();
			const title = {
				title: formData.get("title"),
			};
			await instance.post("/categories", title);
			return null;
		}
		case "PATCH": {
			const formData = await request.formData();
			const category = {
				id: formData.get("id"),
				title: formData.get("title"),
			};
			await instance.patch(`/categories/category/${category.id}`, category);
			return null;
		}
		case "DELETE": {
			const formData = await request.formData();
			const categoryId = formData.get("id");
			await instance.delete(`/categories/category/${categoryId}`);
			return null;
		}
	}
};

export const categoriesLoader = async () => {
	const { data } = await instance.get<Array<CategoryType>>("/categories");

	return data;
};
export const Categories: FC = () => {
	const categories = useLoaderData() as Array<CategoryType>;
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [categoryId, setCategoryId] = useState<number>(0);
	return (
		<>
			<section className='mt-10 p-4 rounded-md bg-slate-800'>
				<h1 className='text-xl text-white'>Ваши категории</h1>
				{/* Category List */}
				<div className='flex flex-wrap items-center gap-2 mt-2'>
					{categories.map((category) => (
						<div
							key={category.id}
							className='group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2'>
							{category.title}
							<div className='items-center justify-between hidden absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 group-hover:flex'>
								<button
									onClick={() => {
										setCategoryId(category.id);
										setVisibleModal(true);
										setIsEdit(true);
									}}
									type='button'>
									<AiFillEdit />
								</button>
								<Form method='DELETE' action='/categories' className='flex'>
									<input type='hidden' name='id' value={category.id} />
									<button type='submit'>
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>
				{/* Add Category */}
				<button
					onClick={() => setVisibleModal(true)}
					type='button'
					className='max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white'>
					<FaPlus />
					<span>Создать категорию</span>
				</button>
			</section>
			{/* Add Category Modal */}
			{visibleModal && (
				<CategoryModal type='post' setVisibleModal={setVisibleModal} />
			)}
			{/* Edit Category Modal */}
			{visibleModal && isEdit && (
				<CategoryModal
					type='patch'
					id={categoryId}
					setVisibleModal={setVisibleModal}
				/>
			)}
		</>
	);
};
