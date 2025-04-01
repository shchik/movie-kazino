import { Controller, Get, HttpCode } from "@nestjs/common";
import { SlotService } from "./slot.service";

@Controller("slots")
export class SlotController {
	constructor(private readonly slotService: SlotService) {}

	@Get("get")
	@HttpCode(200)
	async getSlots() {
		return await this.slotService.getSlots();
	}
}
