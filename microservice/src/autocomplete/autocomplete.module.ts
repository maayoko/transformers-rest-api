import { Module, HttpModule } from "@nestjs/common";
import { ProfileAutocompleteController } from "./autocomplete.controller";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { StrategyCollection } from "./strategies/Collection";

@Module({
	imports: [HttpModule],
	controllers: [ProfileAutocompleteController],
	providers: [ProfileAutocompleteService, StrategyCollection]
})
export class AutocompleteModule {}
