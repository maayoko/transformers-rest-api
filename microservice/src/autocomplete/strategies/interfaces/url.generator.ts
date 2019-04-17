export type UrlGeneratorType = "facebook" | "google" | "reddit" | "instagram";

export interface IUrlGenerator {
	type: UrlGeneratorType;
	generateUrlForProfiles(query: string): string;
	generateUrlForProfile(id: string): string;
	transformData(data: any[]): any;
}
