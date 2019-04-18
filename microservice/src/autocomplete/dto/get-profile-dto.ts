import { IsString, IsNotEmpty, Contains } from "class-validator";
import { SearchEngineType } from "../searchEngines/interfaces/search-engine";

export class GetProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: SearchEngineType;
}
