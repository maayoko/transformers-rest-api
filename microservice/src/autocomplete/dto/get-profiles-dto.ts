import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";
import { SearchEngineType } from "../searchEngines/interfaces/search-engine";

export class GetProfilesDto {
	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: SearchEngineType;

	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValues: number[];
}
