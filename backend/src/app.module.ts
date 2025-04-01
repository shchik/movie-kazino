import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SlotModule } from './slot/slot.module';
import { GenreModule } from './genre/genre.module';
import { SlotImagesModule } from './slot-images/slot-images.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, SlotModule, GenreModule, SlotImagesModule],
})
export class AppModule {}
