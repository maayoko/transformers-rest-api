import { HttpService, NotFoundException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { IStrategy } from "./interfaces/strategy";
import { IUrlGenerator } from "./interfaces/url.generator";
import { map, catchError, pluck } from "rxjs/operators";
import { RetrieveProfileDto } from "../dto/retrieve-profile-dto";

export class SearchStrategy implements IStrategy {
	private readonly http: HttpService = new HttpService();

	constructor(private urlGenerator: IUrlGenerator) {}

	public searchProfiles(query: string): Observable<RetrieveProfileDto[]> {
		const url = this.urlGenerator.generateUrlForProfiles(query);
		return this.http.get(url).pipe(
			pluck("data", "data"),
			map(profiles => this.urlGenerator.transformData(profiles)),
			catchError(err => throwError(new NotFoundException()))
		);
	}

	public searchProfile(id: string): Observable<RetrieveProfileDto> {
		const url = this.urlGenerator.generateUrlForProfile(id);
		return this.http.get(url).pipe(
			pluck("data"),
			map(profile => this.urlGenerator.transformData(profile)),
			catchError(err => throwError(new NotFoundException()))
		);
	}
}
