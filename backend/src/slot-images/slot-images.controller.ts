import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { SlotImagesService } from "./slot-images.service";

@Controller("slot-images")
export class SlotImagesController {
	constructor(private readonly slotImagesService: SlotImagesService) {}

	@Get("get")
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	async getAllImages(@Query("slotId") slotId: string) {
		return await this.slotImagesService.getAllImages(parseInt(slotId));
	}
}
