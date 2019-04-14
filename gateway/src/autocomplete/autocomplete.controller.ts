import { Controller, Post } from "@nestjs/common";
import { AutocompleteService } from "./autocomplete.service";

@Controller("profile-autocomplete")
export class AutocompleteController {
	constructor(private readonly autocompleteService: AutocompleteService) {}

	@Post()
	getProfiles() {
		return this.autocompleteService.getProfiles();
	}
}
