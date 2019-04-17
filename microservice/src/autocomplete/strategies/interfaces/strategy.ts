import { Observable } from "rxjs";
import { RetrieveProfileDto } from "../../dto/retrieve-profile-dto";

export interface IStrategy {
	searchProfiles(query: string): Observable<RetrieveProfileDto[]>;
	searchProfile(query: string): Observable<RetrieveProfileDto>;
}
