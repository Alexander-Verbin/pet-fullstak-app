import axios from "axios";
import { getTokenFromLS } from "../helpers/LS.helper";

export const instance = axios.create({
	baseURL: "http://localhost:3001",
	headers: {
		Authorization: `Bearer ${getTokenFromLS()}`,
	},
});
