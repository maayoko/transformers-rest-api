import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { ApplicationModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ApplicationModule, {
		transport: Transport.TCP,
		options: {
			retryAttempts: 5,
			retryDelay: 3000,
			port: 3009,
			host: "microservice"
		}
	});
	app.useGlobalPipes(new ValidationPipe());
	await app.listenAsync();
}
bootstrap();
