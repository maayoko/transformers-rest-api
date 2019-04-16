import { AbstractStrategy } from "../AbstractStrategy";

export class FacebookPlacesStrategy extends AbstractStrategy {
	private readonly hostname: string =
		"https://graph.facebook.com/v3.2/search?type=place";

	public generateUrl(query: string): string {
		return `${
			this.hostname
		}?q=${query}&fields=name,picture,engagement&access_token=219362465221949|LjHvfEAdURFq9m-ouqv_8mSxjMI`;
	}
}
