import { axiosClassic, axiosWithAuth } from "../api/inteceptors";
import { IResponseUserData, IUserData } from "../types/types";

export const AuthService = {
	async authUser(
		type: "login" | "register",
		userData: IUserData
	): Promise<IResponseUserData> {
		const response = await axiosClassic.post<IResponseUserData>(
			`/auth/${type}`,
			userData
		);
		return response.data;
	},

	async getNewTokens() {
		const response = await axiosClassic.post("auth/access-token");

		return response.data;
	},

	async logout() {
		const response = await axiosWithAuth.post("auth/logout");

		return response.data;
	},
};
