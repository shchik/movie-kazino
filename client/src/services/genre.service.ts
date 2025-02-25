import { axiosClassic } from "../api/inteceptors";
import { GenreType } from "../types/genre-types";

export const GenreService = {
	async getAllGenres() {
		const response = await axiosClassic.get<GenreType[]>("/genres/get");

		return response.data;
	},
};
