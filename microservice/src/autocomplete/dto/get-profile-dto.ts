import { IsString, IsNotEmpty, Contains } from "class-validator";
import { UrlGeneratorType } from "../strategies/interfaces/url.generator";

export class GetProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: UrlGeneratorType;
}
