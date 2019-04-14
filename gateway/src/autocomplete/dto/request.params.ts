import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";

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
