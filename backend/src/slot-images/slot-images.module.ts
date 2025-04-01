import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SlotImagesController } from "./slot-images.controller";
import { SlotImagesService } from "./slot-images.service";

@Module({
	controllers: [SlotImagesController],
	providers: [SlotImagesService, PrismaService],
})
export class SlotImagesModule {}
