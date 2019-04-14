import { Injectable, Inject, Body } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { AUTOCOMPLETE_SERVICE } from "./autocomplete.constants";
import { RequestParamsDto } from "./dto/request.params";

@Injectable()
export class AutocompleteService {
	constructor(
		@Inject(AUTOCOMPLETE_SERVICE) private readonly client: ClientProxy,
	) {}

	getProfiles(params: RequestParamsDto): Observable<any> {
		return this.client.send({ cmd: "getProfiles" }, JSON.stringify(params));
	}
}
