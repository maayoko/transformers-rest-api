import { Module } from "@nestjs/common";
import { AutocompleteController } from "./autocomplete.controller";
import { AutocompleteService } from "./autocomplete.service";

@Module({
	providers: [AutocompleteService],
	controllers: [AutocompleteController],
})
export class AutocompleteModule {}
