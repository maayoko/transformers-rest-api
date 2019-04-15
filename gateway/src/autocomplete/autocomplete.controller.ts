import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { AutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";
import { GetProfileDto } from "./dto/get-profile-dto";

@Controller("profile-autocomplete")
export class AutocompleteController {
	constructor(private readonly autocompleteService: AutocompleteService) {}

	@Post()
	getProfiles(@Body() params: RequestParamsDto) {
		return this.autocompleteService.getProfiles(params);
	}

	@Get(":id")
	getProfile(@Param() userId: GetProfileDto) {
		return this.autocompleteService.getProfile(userId);
	}
}
