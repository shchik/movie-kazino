import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllGenres() {
		return await this.prisma.genre.findMany();
	}
}
