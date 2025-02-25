import { axiosWithAuth } from "../api/inteceptors";

export const SlotService = {
	async getAllSlots() {
		const response = await axiosWithAuth.get("slots/get");

		return response.data;
	},
};
