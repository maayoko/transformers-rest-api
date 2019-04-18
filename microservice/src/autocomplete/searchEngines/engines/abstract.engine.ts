import { HttpService, HttpException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { map, catchError, pluck } from "rxjs/operators";
import { RetrieveProfileDto } from "../../dto/retrieve-profile-dto";
import { AxiosError } from "axios";

export type SearchEngineType = "facebook" | "google" | "reddit" | "instagram";

export abstract class AbstractSearchEngine {
	constructor(private http: HttpService) {}

	abstract generateUrlForProfiles(query: string): string;
	abstract generateUrlForProfile(id: string): string;
	abstract transformData(data: any[]): any;
	abstract handleResponseError(err: AxiosError): HttpException;

	public searchProfiles(query: string): Observable<RetrieveProfileDto[]> {
		const url = this.generateUrlForProfiles(query);
		return this.http.get(url).pipe(
			pluck("data", "data"),
			map(profiles => this.transformData(profiles)),
			catchError(err => throwError(this.handleResponseError(err)))
		);
	}

	public searchProfile(id: string): Observable<RetrieveProfileDto> {
		const url = this.generateUrlForProfile(id);
		return this.http.get(url).pipe(
			pluck("data"),
			map(profile => this.transformData(profile)),
			catchError(err => throwError(this.handleResponseError(err)))
		);
	}
}
