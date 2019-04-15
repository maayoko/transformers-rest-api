import { IsString } from "class-validator";

export class GetProfileDto {
	@IsString()
	id: string;
}
