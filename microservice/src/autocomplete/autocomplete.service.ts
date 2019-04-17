import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { GetProfileDto } from "./dto/get-profile-dto";
import { StrategyCollection } from "./strategies/Collection";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly strategyCollection: StrategyCollection) {}

	getProfiles(getProfilesDto: GetProfilesDto): Observable<AxiosResponse<[]>> {
		const { query, type } = getProfilesDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfiles(query);
	}

	getProfile(getProfileDto: GetProfileDto): Observable<AxiosResponse<{}>> {
		const { id, type } = getProfileDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfile(id);
	}
}
