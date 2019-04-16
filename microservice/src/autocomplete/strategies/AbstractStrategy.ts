import { HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

export type StrategyType = "facebook" | "google" | "reddit" | "instagram";

export abstract class AbstractStrategy {
	private readonly http: HttpService;

	protected abstract generateUrl(query: string): string;

	public searchProfiles(query: string): Observable<AxiosResponse> {
		const url = this.generateUrl(query);
		return this.http.get(url);
	}

	public searchProfile(query: string): Observable<AxiosResponse> {
		const url = this.generateUrl(query);
		return this.http.get(url);
	}
}
