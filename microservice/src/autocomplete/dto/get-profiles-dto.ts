import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";
import { SearchEngineType } from "../searchEngines/interfaces/search-engine";
import { FACEBOOK_ENGINE_TOKEN } from "../searchEngines/engines/facebook.engine";

export class GetProfilesDto {
	@Contains(FACEBOOK_ENGINE_TOKEN)
	@IsString()
	@IsNotEmpty()
	type: SearchEngineType;

	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValues: number[];
}
