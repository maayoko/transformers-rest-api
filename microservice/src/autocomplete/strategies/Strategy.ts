import { HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { IStrategy } from "./interfaces/strategy";
import { IUrlGenerator } from "./interfaces/url.generator";
import { map } from "rxjs/operators";

export type StrategyType = "facebook" | "google" | "reddit" | "instagram";

export class Strategy implements IStrategy {
	private readonly http: HttpService = new HttpService();

	constructor(
		private type: StrategyType,
		private urlGenerator: IUrlGenerator
	) {}

	public searchProfiles(query: string): Observable<AxiosResponse> {
		const url = this.urlGenerator.generateUrlForProfiles(query);
		return this.http.get(url).pipe(map(response => response.data.data));
	}

	public searchProfile(id: string): Observable<AxiosResponse> {
		const url = this.urlGenerator.generateUrlForProfile(id);
		return this.http.get(url).pipe(map(response => response.data));
	}
}
