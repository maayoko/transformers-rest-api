import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";
import { UrlGeneratorType } from "../strategies/interfaces/url.generator";

export class GetProfilesDto {
	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: UrlGeneratorType;

	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValues: number[];
}
