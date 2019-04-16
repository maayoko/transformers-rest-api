import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

export interface IStrategy {
	searchProfiles(query: string): Observable<AxiosResponse>;
	searchProfile(query: string): Observable<AxiosResponse>;
}
