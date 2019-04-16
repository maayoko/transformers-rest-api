import { Inject } from "@nestjs/common";

class FacebookOAuth {
	private readonly OAUTH_EXCEPTION = "OAuthException";

	constructor(@Inject("FACEBOOK_CONFIG") facebookConfig) {}

	validateAccessToken() {}

	isAccessTokenValid(token: string) {
		return token !== this.OAUTH_EXCEPTION;
	}
}
