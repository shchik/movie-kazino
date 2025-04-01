import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SlotService {
	constructor(private readonly prisma: PrismaService) {}

	async getSlots() {
		return await this.prisma.slot.findMany();
	}
}
