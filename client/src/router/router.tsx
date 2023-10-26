import { createBrowserRouter } from "react-router-dom";
import { Layuot } from "../pages/Layuot";
import { ErrorPage } from "../pages/ErrorPage";
import { Home } from "../pages/Home";
import { Transactions } from "../pages/Transactions";
import {
	Categories,
	categoriesActions,
	categoriesLoader,
} from "../pages/Categories";
import { Auth } from "../pages/Auth";
import { ProtectedRout } from "../components/ProtectedRout";
import { transactionAction, transactionLoader } from "../pages/Transactions";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layuot />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRout>
						<Home />
					</ProtectedRout>
				),
			},
			{
				path: "transactions",
				action: transactionAction,
				loader: transactionLoader,
				element: (
					<ProtectedRout>
						<Transactions />
					</ProtectedRout>
				),
			},
			{
				path: "categories",
				action: categoriesActions,
				loader: categoriesLoader,
				element: (
					<ProtectedRout>
						<Categories />
					</ProtectedRout>
				),
			},
			{
				path: "auth",
				element: <Auth />,
			},
		],
	},
]);
