import {
	Controller,
	UseFilters,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from "@nestjs/common";
import { ProfileAutocompleteService } from "./autocomplete.service";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { Observable } from "rxjs";
import { GetProfileDto } from "./dto/get-profile-dto";
import { MessagePattern } from "@nestjs/microservices";
import { KnownExceptionFilter } from "./filters/known-exception.filter";
import { UnknownExceptionFilter } from "./filters/unknown-exception.filter";
import { RetrieveProfileDto } from "./dto/retrieve-profile-dto";
import { ProfilesFilterInterceptor } from "./interceptors/profiles-filter.interceptor";

@UsePipes(ValidationPipe)
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
