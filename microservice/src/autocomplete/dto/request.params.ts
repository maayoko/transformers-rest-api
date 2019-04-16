import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";

export class RequestParamsDto {
	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: string;

	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValue: number[];
}
