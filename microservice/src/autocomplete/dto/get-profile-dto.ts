import { IsString, IsNotEmpty, Contains } from "class-validator";
import { SearchEngineType } from "../searchEngines/interfaces/search-engine";
import { FACEBOOK_ENGINE_TOKEN } from "../searchEngines/engines/facebook.engine";

export class GetProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@Contains(FACEBOOK_ENGINE_TOKEN)
	@IsString()
	@IsNotEmpty()
	type: SearchEngineType;
}
