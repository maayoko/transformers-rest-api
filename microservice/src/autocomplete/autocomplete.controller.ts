import { Controller, Get, Query } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Controller()
export class ProfileAutocompleteController {
	constructor(
		private readonly profileAutocompleteService: ProfileAutocompleteService
	) {}

	@MessagePattern({ cmd: "getProfiles" })
	getProfiles(params: RequestParamsDto): Observable<AxiosResponse<[]>> {
		console.log(params);
		return this.profileAutocompleteService.getProfiles();
	}
}
