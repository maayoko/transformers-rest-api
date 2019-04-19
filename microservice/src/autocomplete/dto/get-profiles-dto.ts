import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { BaseGetProfileDto } from "./base-get-profile-dto";

export class GetProfilesDto extends BaseGetProfileDto {
	@IsNotEmpty()
	@IsString()
	query: string;

	@IsArray()
	currentValues: number[];
}
