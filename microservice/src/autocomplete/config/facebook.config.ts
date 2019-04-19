import { IFacebookConfig } from "./interfaces/facebook-config.interface";

export const DEFAULT_FACEBOOK_CONFIG: IFacebookConfig = {
	client_id: process.env.FACEBOOK_CLIENT_ID || "",
	client_secret: process.env.FACEBOOK_CLIENT_SECRET || "",
	base_url: "https://graph.facebook.com/v3.2",
	fields: ["name", "picture", "engagement"]
};
export const FACEBOOK_CONFIG_TOKEN = "FacebookConfig";
