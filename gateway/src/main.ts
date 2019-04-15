import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.disable("x-powered-by");
	await app.listen(3000);
}
bootstrap();
