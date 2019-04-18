import { FacebookSearchEngine, FACEBOOK_ENGINE_TOKEN } from "./facebook.engine";

export const searchEngines = [
	{
		provide: FACEBOOK_ENGINE_TOKEN,
		useClass: FacebookSearchEngine
	}
];
