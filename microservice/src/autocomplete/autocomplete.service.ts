import { Injectable, HttpService } from "@nestjs/common";
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { RequestParamsDto } from "./dto/request.params";
import { GetProfileDto } from "./dto/get-profile-dto";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly http: HttpService) {}

	getProfiles(
		requestParamsDto: RequestParamsDto
	): Observable<AxiosResponse<[]>> {
		try {
			return this.http
				.get(
					`https://graph.facebook.com/v3.2/search?type=place&q=${
						requestParamsDto.query
					}&fields=name,picture,engagement&access_token=219362465221949|LjHvfEAdURFq9m-ouqv_8mSxjMI`
				)
				.pipe(
					map(response => {
						return response.data.data;
					})
				);
		} catch (e) {
			return Observable.create((observer: Observer<any>) => {
				observer.error(e);
				observer.complete();
			});
		}
	}

	getProfile(getProfileDto: GetProfileDto): Observable<AxiosResponse<{}>> {
		console.log(getProfileDto);
		return Observable.create((observer: Observer<{}>) => {
			setTimeout(() => {
				observer.next({ name: "John Doe", id: "fjwfienfinkf" });
				observer.complete();
			}, 3000);
		});
	}
}
