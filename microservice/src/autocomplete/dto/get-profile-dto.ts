import { IsString, Contains } from "class-validator";

export class GetProfileDto {
	@IsString()
	id: string;

	@Contains("facebook")
	@IsString()
	type: string;
}
