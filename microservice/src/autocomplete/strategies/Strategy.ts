import { HttpService, Injectable, BadRequestException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { IStrategy } from "./interfaces/strategy";
import { SearchEngine } from "./interfaces/search-engine";
import { map, catchError, pluck } from "rxjs/operators";
import { RetrieveProfileDto } from "../dto/retrieve-profile-dto";

@Injectable()
export class SearchStrategy implements IStrategy {
	private readonly http: HttpService = new HttpService();

	constructor(private searchEngine: SearchEngine) {}

	public searchProfiles(query: string): Observable<RetrieveProfileDto[]> {
		const url = this.searchEngine.generateUrlForProfiles(query);
		return this.http.get(url).pipe(
			pluck("data", "data"),
			map(profiles => this.searchEngine.transformData(profiles)),
			catchError(err =>
				throwError(this.searchEngine.handleResponseError(err))
			)
		);
	}

	public searchProfile(id: string): Observable<RetrieveProfileDto> {
		const url = this.searchEngine.generateUrlForProfile(id);
		return this.http.get(url).pipe(
			pluck("data"),
			map(profile => this.searchEngine.transformData(profile)),
			catchError(err =>
				throwError(this.searchEngine.handleResponseError(err))
			)
		);
	}
}
