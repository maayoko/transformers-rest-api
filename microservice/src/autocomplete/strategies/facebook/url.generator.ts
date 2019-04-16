import { IUrlGenerator } from "../interfaces/url.generator";

export class FacebookUrlGenerator implements IUrlGenerator {
	public static TYPE = "facebook";
	private readonly BASE_URL = "https://graph.facebook.com/v3.2";
	private readonly COMMON_FIELDS = "name,picture,engagement";

	generateUrlForProfiles(query: string): string {
		return `${this.BASE_URL}/search?type=place&q=${query}&fields=${
			this.COMMON_FIELDS
		}&access_token=219362465221949|LjHvfEAdURFq9m-ouqv_8mSxjMI`;
	}

	generateUrlForProfile(id: string): string {
		return `${this.BASE_URL}/${id}?fields=${
			this.COMMON_FIELDS
		}&access_token=219362465221949|LjHvfEAdURFq9m-ouqv_8mSxjMI`;
	}
}
