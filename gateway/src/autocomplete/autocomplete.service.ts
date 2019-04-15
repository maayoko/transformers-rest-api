import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { AUTOCOMPLETE_SERVICE } from "./autocomplete.constants";
import { RequestParamsDto } from "./dto/request.params";
import { GetProfileDto } from "./dto/get-profile-dto";

@Injectable()
export class AutocompleteService {
	constructor(
		@Inject(AUTOCOMPLETE_SERVICE) private readonly client: ClientProxy,
	) {}

	getProfiles(dto: RequestParamsDto): Observable<any> {
		return this.client.send({ cmd: "getProfiles" }, dto);
	}

	getProfile(dto: GetProfileDto) {
		return this.client.send({ cmd: "getProfile" }, dto);
	}
}
