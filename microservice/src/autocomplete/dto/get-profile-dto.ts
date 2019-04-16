import { IsString, IsNotEmpty, Contains } from "class-validator";

export class GetProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@Contains("facebook")
	@IsString()
	@IsNotEmpty()
	type: string;
}
