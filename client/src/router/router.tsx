import { createBrowserRouter } from "react-router-dom";
import { Layuot } from "../pages/Layuot";
import { ErrorPage } from "../pages/ErrorPage";
import { Home } from "../pages/Home";
import { Transactions } from "../pages/Transactions";
import { Categories } from "../pages/Categories";
import { Auth } from "../pages/Auth";
import { ProtectedRout } from "../components/ProtectedRout";

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
				element: (
					<ProtectedRout>
						<Transactions />
					</ProtectedRout>
				),
			},
			{
				path: "categories",
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
