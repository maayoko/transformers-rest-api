import { Module, HttpModule } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PROFILE_AUTOCOMPLETE_SERVICE } from "./autocomplete.constants";
import { ProfileAutocompleteController } from "./autocomplete.controller";
import { ProfileAutocompleteService } from "./autocomplete.service";

@Module({
	imports: [
		ClientsModule.register([
			{ name: PROFILE_AUTOCOMPLETE_SERVICE, transport: Transport.TCP }
		]),
		HttpModule
	],
	controllers: [ProfileAutocompleteController],
	providers: [ProfileAutocompleteService]
})
export class AutocompleteModule {}
