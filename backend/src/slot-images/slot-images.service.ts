import { Get, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SlotImagesService {
	constructor(private readonly prisma: PrismaService) {}

	@Get("get")
	async getAllImages(slotId: number) {
		return await this.prisma.images.findMany({ where: { slotId: slotId } });
	}
}
