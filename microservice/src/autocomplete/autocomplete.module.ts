import { Module, HttpModule } from "@nestjs/common";
import { ProfileAutocompleteController } from "./autocomplete.controller";
import { ProfileAutocompleteService } from "./autocomplete.service";

@Module({
	imports: [HttpModule],
	controllers: [ProfileAutocompleteController],
	providers: [ProfileAutocompleteService]
})
export class AutocompleteModule {}
