import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { ApplicationModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ApplicationModule, {
		transport: Transport.TCP,
		options: {
			retryAttempts: 5,
			retryDelay: 3000,
			port:
				((process.env.MICROSERVICE_PORT as unknown) as number) || 3009,
			host: process.env.MICROSERVICE_HOSTNAME || "microservice"
		}
	});
	await app.listenAsync();
}
bootstrap();
