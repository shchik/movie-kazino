import { Controller, Get, HttpCode } from "@nestjs/common";
import { GenreService } from "./genre.service";

@Controller("genres")
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get("get")
	@HttpCode(200)
	async getGenres() {
		return await this.genreService.getAllGenres();
	}
}
