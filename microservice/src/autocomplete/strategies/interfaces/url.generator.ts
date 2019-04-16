export interface IUrlGenerator {
	generateUrlForProfiles(query: string): string;
	generateUrlForProfile(id: string): string;
}
