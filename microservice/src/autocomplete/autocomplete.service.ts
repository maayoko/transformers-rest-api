import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly http: HttpService) {}

	getProfiles(): Observable<AxiosResponse<[]>> {
		// return this.http.get("");
		return Observable.create(observer => {
			setTimeout(() => {
				observer.next([
					{ name: "John Doe", id: "fjwfienfinkf" },
					{ name: "Jane Doe", id: "fkjfirefrwfkwn" },
					{ name: "Marry Doe", id: "nfewjnfkw" }
				]);
				observer.complete();
			}, 3000);
		});
	}
}
