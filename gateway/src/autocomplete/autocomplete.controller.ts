import {
	Controller,
	Post,
	Body,
	Get,
	Query,
	HttpCode,
	UseFilters,
} from "@nestjs/common";
import { AutocompleteService } from "./autocomplete.service";
import { RequestParamsDto } from "./dto/request.params";
import { GetProfileDto } from "./dto/get-profile-dto";
import { AllExceptionFilter } from "../common/filters/rpc-exception.filter";

@UseFilters(AllExceptionFilter)
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
		return this.autocompleteService.getProfile(getProfileDto);
	}
}
