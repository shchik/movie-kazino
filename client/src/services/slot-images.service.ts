import { axiosWithAuth } from "../api/inteceptors";
import { ImagesResponseType } from "../types/types";

export const SlotImagesService = {
	async getImagesBySlotId(slotId: number) {
		const response = await axiosWithAuth.get<ImagesResponseType[]>(
			`/slot-images/get?slotId=${slotId}`
		);
		return response.data;
	},
};
