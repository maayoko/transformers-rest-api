import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { GetProfileDto } from "./dto/get-profile-dto";
import { StrategyCollection } from "./strategies/Collection";
import { RetrieveProfileDto } from "./dto/retrieve-profile-dto";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly strategyCollection: StrategyCollection) {}

	getProfiles(
		getProfilesDto: GetProfilesDto
	): Observable<RetrieveProfileDto[]> {
		const { query, type } = getProfilesDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfiles(query);
	}

	getProfile(getProfileDto: GetProfileDto): Observable<RetrieveProfileDto> {
		const { id, type } = getProfileDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfile(id);
	}
}
