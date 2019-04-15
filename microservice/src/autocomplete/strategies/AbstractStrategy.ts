import { HttpService } from "@nestjs/common";
import { Observable } from "rxjs";

export abstract class AbstractStrategy {
	constructor(private readonly http: HttpService) {}

	public abstract generateUrl(): string;

	// public searchProfiles(): Observable<any> {
	//     const url = this.generateUrl();
	// }

	// public searchProfile(): Observable<any> {}
}
