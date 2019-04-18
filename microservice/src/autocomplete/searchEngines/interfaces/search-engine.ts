import { AxiosError } from "axios";
import { HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { RetrieveProfileDto } from "../../dto/retrieve-profile-dto";

export type SearchEngineType = "facebook" | "google" | "reddit" | "instagram";

export interface ISearchEngine {
	type: SearchEngineType;
	generateUrlForProfiles(query: string): string;
	generateUrlForProfile(id: string): string;
	transformData(data: any[]): any;
	handleResponseError(err: AxiosError): HttpException;
	searchProfiles(query: string): Observable<RetrieveProfileDto[]>;
	searchProfile(query: string): Observable<RetrieveProfileDto>;
}
