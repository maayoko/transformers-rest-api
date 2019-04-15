import { Controller } from "@nestjs/common";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { GetProfileDto } from "./dto/get-profile-dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class ProfileAutocompleteController {
	constructor(
		private readonly profileAutocompleteService: ProfileAutocompleteService
	) {}

	@MessagePattern({ cmd: "getProfiles" })
	getProfiles(params: RequestParamsDto): Observable<AxiosResponse<[]>> {
		console.log(params);
		return this.profileAutocompleteService.getProfiles(params);
	}

	@MessagePattern({ cmd: "getProfile" })
	getProfile(params: GetProfileDto): Observable<AxiosResponse<{}>> {
		return this.profileAutocompleteService.getProfile(params);
	}
}
