import {
	Controller,
	Post,
	Body,
	Get,
	UseInterceptors,
	Query,
} from "@nestjs/common";
import { AutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";
import { GetProfileDto } from "./dto/get-profile-dto";
import { ValidationInterceptor } from "../common/interceptors/validation.interceptor";

@UseInterceptors(ValidationInterceptor)
@Controller("profile-autocomplete")
export class AutocompleteController {
	constructor(private readonly autocompleteService: AutocompleteService) {}

	@Post()
	getProfiles(@Body() params: RequestParamsDto) {
		return this.autocompleteService.getProfiles(params);
	}

	@Get()
	getProfile(@Query() getProfileDto: GetProfileDto) {
		return this.autocompleteService.getProfile(getProfileDto);
	}
}
