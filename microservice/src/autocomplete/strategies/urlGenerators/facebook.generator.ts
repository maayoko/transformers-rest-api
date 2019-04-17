import { IUrlGenerator } from "../interfaces/url.generator";
import { FACEBOOK_CONFIG_TOKEN } from "../../../config/facebook.config";
import { Inject, Injectable } from "@nestjs/common";
import { IFacebookConfig } from "src/config/facebook-config.interface";
import { UrlGeneratorType } from "../interfaces/url.generator";

@Injectable()
export class FacebookUrlGenerator implements IUrlGenerator {
	public type: UrlGeneratorType = "facebook";

	constructor(
		@Inject(FACEBOOK_CONFIG_TOKEN)
		private readonly fbConfig: IFacebookConfig
	) {}

	private getToken() {
		const { client_id, client_secret } = this.fbConfig;
		return `${client_id}|${client_secret}`;
	}

	generateUrlForProfiles(query: string): string {
		const { base_url, fields: arrFileds } = this.fbConfig;
		const fields = arrFileds.join(",");
		return `${base_url}/search?type=place&q=${query}&fields=${fields}&access_token=${this.getToken()}`;
	}

	generateUrlForProfile(id: string): string {
		const { base_url, fields: arrFileds } = this.fbConfig;
		const fields = arrFileds.join(",");
		return `${base_url}/${id}?fields=${fields}&access_token=${this.getToken()}`;
	}
}
