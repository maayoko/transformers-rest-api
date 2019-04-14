import { Controller, Post, Body } from "@nestjs/common";
import { AutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";

@Controller("profile-autocomplete")
export class AutocompleteController {
	constructor(private readonly autocompleteService: AutocompleteService) {}

	@Post()
	getProfiles(@Body() params: RequestParamsDto) {
		console.log(params);
		return this.autocompleteService.getProfiles(params);
	}
}
