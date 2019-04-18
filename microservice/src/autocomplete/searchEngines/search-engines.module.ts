import { Module, HttpModule } from "@nestjs/common";
import { searchEngines } from "./engines";
import { configs } from "../config/index";

@Module({
	imports: [HttpModule],
	providers: [...searchEngines, ...configs],
	exports: [...searchEngines, HttpModule, ...configs]
})
export class SearchEnginesModule {}
