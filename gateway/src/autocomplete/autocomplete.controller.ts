import {
	Controller,
	Post,
	Body,
	Get,
	UseInterceptors,
	Query,
	HttpCode,
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
	@HttpCode(200)
	getProfiles(@Body() params: RequestParamsDto) {
		return this.autocompleteService.getProfiles(params);
	}

	@Get()
	@HttpCode(200)
	getProfile(@Query() getProfileDto: GetProfileDto) {
		console.log(getProfileDto);
		return this.autocompleteService.getProfile(getProfileDto);
	}
}
