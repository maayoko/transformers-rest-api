import { IsString, IsNumber } from "class-validator";

export class RetrieveProfileDto {
	@IsString()
	id: string;

	@IsNumber()
	subscribers: number;

	@IsString()
	imageUrl: string;

	@IsString()
	name: string;
}
