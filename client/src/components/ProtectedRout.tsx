import { FC } from "react";
import { useAuth } from "../hooks";
import { Auth } from "../pages/Auth";

type PropsType = {
	children: JSX.Element;
};

export const ProtectedRout: FC<PropsType> = ({ children }) => {
	const isAuth = useAuth();
	return <>{isAuth ? children : <Auth />}</>;
};
