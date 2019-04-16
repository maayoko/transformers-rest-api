import { IsString, IsNotEmpty, Contains } from "class-validator";
import { StrategyType } from "../strategies/Strategy";

export class GetProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: StrategyType;
}
