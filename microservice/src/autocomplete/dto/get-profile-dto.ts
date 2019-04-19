import { IsString, IsNotEmpty } from "class-validator";
import { BaseGetProfileDto } from "./base-get-profile-dto";

export class GetProfileDto extends BaseGetProfileDto {
	@IsString()
	@IsNotEmpty()
	id: string;
}
