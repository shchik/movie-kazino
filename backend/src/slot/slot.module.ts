import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SlotController } from "./slot.controller";
import { SlotService } from "./slot.service";

@Module({
	controllers: [SlotController],
	providers: [SlotService, PrismaService],
})
export class SlotModule {}
