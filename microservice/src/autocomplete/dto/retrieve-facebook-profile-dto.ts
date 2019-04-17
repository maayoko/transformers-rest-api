interface PictureData {
	height: number;
	is_silhouette: boolean;
	url: string;
	width: number;
}

interface Picture {
	data: PictureData;
}

interface Engagement {
	count: number;
	social_sentence: string;
}

export interface RetrieveFacebookProfileDto {
	name: string;
	picture: Picture;
	engagement: Engagement;
	id: string;
}
