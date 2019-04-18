import { Module } from "@nestjs/common";
import { ProfileAutocompleteController } from "./autocomplete.controller";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { SearchEnginesModule } from "./searchEngines/search-engines.module";
import { searchEngines } from "./searchEngines/engines";

@Module({
	imports: [SearchEnginesModule],
	controllers: [ProfileAutocompleteController],
	providers: [ProfileAutocompleteService, ...searchEngines]
})
export class AutocompleteModule {}
