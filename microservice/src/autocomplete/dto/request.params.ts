import { IsNotEmpty, IsString, Contains, IsArray } from "class-validator";
import { StrategyType } from "../strategies/Strategy";

export class RequestParamsDto {
	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: StrategyType;

	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValue: number[];
}
