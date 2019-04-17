import {
	DEFAULT_FACEBOOK_CONFIG,
	FACEBOOK_CONFIG_TOKEN
} from "./facebook.config";

export const configs = [
	{
		provide: FACEBOOK_CONFIG_TOKEN,
		useValue: DEFAULT_FACEBOOK_CONFIG
	}
];
