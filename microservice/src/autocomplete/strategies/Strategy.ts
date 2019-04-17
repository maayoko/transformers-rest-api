import { HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { IStrategy } from "./interfaces/strategy";
import { IUrlGenerator } from "./interfaces/url.generator";
import { map, catchError } from "rxjs/operators";

export class Strategy implements IStrategy {
	private readonly http: HttpService = new HttpService();

	constructor(private urlGenerator: IUrlGenerator) {}

	public searchProfiles(query: string): Observable<AxiosResponse> {
		const url = this.urlGenerator.generateUrlForProfiles(query);
		return this.http.get(url).pipe(
			map(response => response.data.data),
			catchError(err => {
				console.log(err);
				return err;
			})
		);
	}

	public searchProfile(id: string): Observable<AxiosResponse> {
		const url = this.urlGenerator.generateUrlForProfile(id);
		return this.http.get(url).pipe(map(response => response.data));
	}
}
