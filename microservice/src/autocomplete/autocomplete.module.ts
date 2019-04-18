import { Module, HttpModule } from "@nestjs/common";
import { ProfileAutocompleteController } from "./autocomplete.controller";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { StrategyCollection } from "./strategies/Collection";
import { configs } from "./config/index";
import { searchEngines } from "./strategies/searchEngines";

@Module({
	imports: [HttpModule],
	controllers: [ProfileAutocompleteController],
	providers: [
		ProfileAutocompleteService,
		StrategyCollection,
		...configs,
		...searchEngines
	]
})
export class AutocompleteModule {}
