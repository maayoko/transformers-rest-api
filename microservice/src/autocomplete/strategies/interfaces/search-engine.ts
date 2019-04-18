import { AxiosError } from "axios";
import { HttpException } from "@nestjs/common";

export type SearchEngineType = "facebook" | "google" | "reddit" | "instagram";

export interface SearchEngine {
	type: SearchEngineType;
	generateUrlForProfiles(query: string): string;
	generateUrlForProfile(id: string): string;
	transformData(data: any[]): any;
	handleResponseError(err: AxiosError): HttpException;
}
