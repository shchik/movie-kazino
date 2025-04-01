import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.use(cookieParser());
	app.enableCors({
		origin: "http://localhost:5173",
		credentials: true,
		exposedHeaders: "set-cookie",
	});
	await app.listen(process.env.PORT ?? 5173);
}
bootstrap();
