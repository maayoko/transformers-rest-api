import { Injectable, NotFoundException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { GetProfilesDto } from "./dto/get-profiles-dto";
import { GetProfileDto } from "./dto/get-profile-dto";
import { RetrieveProfileDto } from "./dto/retrieve-profile-dto";
import { ModuleRef } from "@nestjs/core";
import {
	SearchEngineType,
	AbstractSearchEngine
} from "./searchEngines/engines/abstract.engine";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private moduleRef: ModuleRef) {}

	private getEngine(type: SearchEngineType) {
		try {
			return this.moduleRef.get<AbstractSearchEngine>(type);
		} catch (e) {
			return throwError(
				new NotFoundException(
					`Search engine '${type}' not implemented.`
				)
			);
		}
	}

	getProfiles(
		getProfilesDto: GetProfilesDto
	): Observable<RetrieveProfileDto[]> {
		const { query, type } = getProfilesDto;
		const engine = this.getEngine(type);
		return engine instanceof AbstractSearchEngine
			? engine.searchProfiles(query)
			: engine;
	}

	getProfile(getProfileDto: GetProfileDto): Observable<RetrieveProfileDto> {
		const { id, type } = getProfileDto;
		const engine = this.getEngine(type);
		return engine instanceof AbstractSearchEngine
			? engine.searchProfile(id)
			: engine;
	}
}
