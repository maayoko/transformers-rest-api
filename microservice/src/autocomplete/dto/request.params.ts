import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";
import { sites } from "../../config/social-sites.json";

export class RequestParamsDto {
	@Contains("facebook")
	@IsString()
	type: string;

	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValue: number[];
}
