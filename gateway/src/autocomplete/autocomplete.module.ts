import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AutocompleteController } from "./autocomplete.controller";
import { AutocompleteService } from "./autocomplete.service";
import { AUTOCOMPLETE_SERVICE } from "./autocomplete.constants";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: AUTOCOMPLETE_SERVICE,
				transport: Transport.TCP,
				options: { host: "microservice", port: 3009 },
			},
		]),
	],
	controllers: [AutocompleteController],
	providers: [AutocompleteService],
})
export class AutocompleteModule {}
