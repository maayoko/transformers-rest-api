import { Injectable, HttpService } from "@nestjs/common";
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { RequestParamsDto } from "./dto/request.params";
import { GetProfileDto } from "./dto/get-profile-dto";
import { StrategyCollection } from "./strategies/Collection";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly strategyCollection: StrategyCollection) {}

	getProfiles(
		requestParamsDto: RequestParamsDto
	): Observable<AxiosResponse<[]>> {
		const { query, type } = requestParamsDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfiles(query);
	}

	getProfile(getProfileDto: GetProfileDto): Observable<AxiosResponse<{}>> {
		const { id, type } = getProfileDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfile(id);
	}
}
