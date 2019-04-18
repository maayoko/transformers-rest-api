import { IUrlGenerator } from "../interfaces/url.generator";
import { FACEBOOK_CONFIG_TOKEN } from "../../../config/facebook.config";
import { Inject, Injectable } from "@nestjs/common";
import { IFacebookConfig } from "../../../config/interfaces/facebook-config.interface";
import { UrlGeneratorType } from "../interfaces/url.generator";
import { RetrieveFacebookProfileDto } from "../../dto/retrieve-facebook-profile-dto";
import { RetrieveProfileDto } from "../../dto/retrieve-profile-dto";

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

	private createProfile(fbProfile: RetrieveFacebookProfileDto) {
		const profile = new RetrieveProfileDto();
		profile.id = fbProfile.id;
		profile.name = fbProfile.name;
		profile.subscribers = fbProfile.engagement.count;
		profile.imageUrl = fbProfile.picture.data.url;

		return profile;
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

	transformData(
		fbProfiles: RetrieveFacebookProfileDto[] | RetrieveFacebookProfileDto
	) {
		if (Object.prototype.toString.call(fbProfiles) === "[object Object]") {
			return this.createProfile(fbProfiles as RetrieveFacebookProfileDto);
		}
		return (fbProfiles as RetrieveFacebookProfileDto[]).map(fbProfile =>
			this.createProfile(fbProfile)
		);
	}
}
