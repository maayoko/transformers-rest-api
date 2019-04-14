import { Injectable, HttpService } from "@nestjs/common";
import { Observable, Observer } from "rxjs";
import { AxiosResponse } from "axios";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ProfileAutocompleteService {
	constructor(private readonly http: HttpService) {}

	getProfiles(): Observable<AxiosResponse<[]>> {
		// return this.http.get("");
		return Observable.create((observer: Observer<any>) => {
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

	getProfile(): Observable<AxiosResponse<{}>> {
		return Observable.create((observer: Observer<{}>) => {
			setTimeout(() => {
				observer.next({ name: "John Doe", id: "fjwfienfinkf" });
				observer.complete();
			}, 3000);
		});
	}
}
