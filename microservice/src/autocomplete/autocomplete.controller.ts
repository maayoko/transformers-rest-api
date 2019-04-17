import { Controller, UseFilters } from "@nestjs/common";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { GetProfileDto } from "./dto/get-profile-dto";
import { MessagePattern } from "@nestjs/microservices";
import { ExceptionFilter } from "../common/filters/rpc-exception.filter";

@UseFilters(new ExceptionFilter())
@Controller()
export class ProfileAutocompleteController {
	constructor(
		private readonly profileAutocompleteService: ProfileAutocompleteService
	) {}

	@MessagePattern({ cmd: "getProfiles" })
	getProfiles(getProfilesDto: GetProfilesDto): Observable<AxiosResponse<[]>> {
		return this.profileAutocompleteService.getProfiles(getProfilesDto);
	}

	@MessagePattern({ cmd: "getProfile" })
	getProfile(getProfileDto: GetProfileDto): Observable<AxiosResponse<{}>> {
		return this.profileAutocompleteService.getProfile(getProfileDto);
	}
}
