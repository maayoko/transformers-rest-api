import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { GetProfileDto } from "./dto/get-profile-dto";
import { StrategyCollection } from "./strategies/Collection";
import { map } from "rxjs/operators";
import { RetrieveProfileDto } from "./dto/retrieve-profile-dto";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly strategyCollection: StrategyCollection) {}

	getProfiles(
		getProfilesDto: GetProfilesDto
	): Observable<RetrieveProfileDto[]> {
		const { query, type, currentValues } = getProfilesDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy
			.searchProfiles(query)
			.pipe(
				map(profiles =>
					profiles.filter(
						profile => !currentValues.includes(Number(profile.id))
					)
				)
			);
	}

	getProfile(getProfileDto: GetProfileDto): Observable<RetrieveProfileDto> {
		const { id, type } = getProfileDto;
		const strategy = this.strategyCollection.getStrategy(type);
		return strategy.searchProfile(id);
	}
}
