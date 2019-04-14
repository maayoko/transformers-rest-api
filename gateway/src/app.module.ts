import { Module } from "@nestjs/common";
import { AutocompleteModule } from "./autocomplete/autocomplete.module";

@Module({
	imports: [AutocompleteModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
