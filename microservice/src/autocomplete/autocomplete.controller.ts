import { Controller, Get, Query } from "@nestjs/common";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Controller("profile-autocomplete")
export class ProfileAutocompleteController {
	constructor(
		private readonly profileAutocompleteService: ProfileAutocompleteService
	) {}

	@Get()
	searchProfiles(@Query() requestParamsDto): Observable<AxiosResponse<[]>> {
		console.log(requestParamsDto);
		return this.profileAutocompleteService.getProfiles();
		// return "Success";
	}
}
