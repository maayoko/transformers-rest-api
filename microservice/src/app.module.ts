import { Module } from "@nestjs/common";
// import { MathModule } from "./math/math.module";
import { AutocompleteModule } from "./autocomplete/autocomplete.module";

@Module({
	imports: [AutocompleteModule]
})
export class ApplicationModule {}
