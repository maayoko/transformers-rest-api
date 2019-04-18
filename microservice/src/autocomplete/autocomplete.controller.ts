import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { Observable } from "rxjs";
import { GetProfileDto } from "./dto/get-profile-dto";
import { MessagePattern } from "@nestjs/microservices";
import { KnownExceptionFilter } from "../common/filters/known-exception.filter";
import { UnknownExceptionFilter } from "../common/filters/unknown-exception.filter";
import { RetrieveProfileDto } from "./dto/retrieve-profile-dto";
import { ProfilesFilterInterceptor } from "../common/interceptors/profiles-filter.interceptor";

@UseFilters(UnknownExceptionFilter, KnownExceptionFilter)
@Controller()
export class ProfileAutocompleteController {
	constructor(
		private readonly profileAutocompleteService: ProfileAutocompleteService
	) {}

	@UseInterceptors(ProfilesFilterInterceptor)
	@MessagePattern({ cmd: "getProfiles" })
	getProfiles(
		getProfilesDto: GetProfilesDto
	): Observable<RetrieveProfileDto[]> {
		return this.profileAutocompleteService.getProfiles(getProfilesDto);
	}

	@MessagePattern({ cmd: "getProfile" })
	getProfile(getProfileDto: GetProfileDto): Observable<RetrieveProfileDto> {
		return this.profileAutocompleteService.getProfile(getProfileDto);
	}
}
