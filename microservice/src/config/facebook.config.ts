import { IFacebookConfig } from "./facebook-config.interface";

export const DEFAULT_FACEBOOK_CONFIG: IFacebookConfig = {
	client_id: "219362465221949",
	client_secret: "84cbf2cff42c48c8b4aaa723ed36acb2",
	base_url: "https://graph.facebook.com/v3.2",
	fields: ["name", "picture", "engagement"]
};
export const FACEBOOK_CONFIG_TOKEN = "FacebookConfig";
