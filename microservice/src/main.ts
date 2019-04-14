import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { ApplicationModule } from "./app.module";

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
	await app.listenAsync();
}
bootstrap();
