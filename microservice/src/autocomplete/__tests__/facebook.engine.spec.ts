import { Test } from "@nestjs/testing";
import { FacebookSearchEngine } from "../searchEngines/engines/facebook.engine";
import { HttpModule, HttpService, BadRequestException } from "@nestjs/common";
import { configs } from "../config";
import { of, throwError } from "rxjs";
import { RetrieveProfileDto } from "../dto/retrieve-profile-dto";
import { RetrieveFacebookProfileDto } from "../dto/retrieve-facebook-profile-dto";
import { AxiosResponse } from "axios";

describe("FacebookSearchEngine", () => {
	let fbSearchEngine: FacebookSearchEngine;
	let http: HttpService;

	const retrievedProfile = new RetrieveProfileDto();
	retrievedProfile.id = "42313231";
	retrievedProfile.imageUrl =
		"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/40485009_2186768654935897_6542385890856009728_n.png?_nc_cat=100&_nc_ht=scontent.xx&oh=b1197042a89359949ab1d26db67139ce&oe=5D3DEA82";
	retrievedProfile.name = "Bornfight";
	retrievedProfile.subscribers = 1940;

	const fbRetrieveProfile: RetrieveFacebookProfileDto = {
		id: "42313231",
		name: "Bornfight",
		picture: {
			data: {
				height: 50,
				is_silhouette: false,
				url:
					"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/40485009_2186768654935897_6542385890856009728_n.png?_nc_cat=100&_nc_ht=scontent.xx&oh=b1197042a89359949ab1d26db67139ce&oe=5D3DEA82",
				width: 50
			}
		},
		engagement: {
			count: 1940,
			social_sentence: "1940 likes"
		}
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			imports: [HttpModule],
			providers: [FacebookSearchEngine, ...configs]
		}).compile();

		fbSearchEngine = module.get<FacebookSearchEngine>(FacebookSearchEngine);
		http = module.get<HttpService>(HttpService);
	});

	it("should give us an instance", () => {
		expect(fbSearchEngine).toBeInstanceOf(FacebookSearchEngine);
	});

	it("should return a list of profiles", async () => {
		const retrievedFbProfiles = [fbRetrieveProfile];
		const query = "bornfight";
		const axiosResponse = {
			data: {
				data: retrievedFbProfiles
			}
		} as AxiosResponse;

		jest.spyOn(http, "get").mockImplementation(() => of(axiosResponse));

		const result = await fbSearchEngine.searchProfiles(query).toPromise();
		expect(result).toEqual([retrievedProfile]);
		expect(result).toHaveLength(1);
		expect(http.get).toHaveBeenCalledTimes(1);
		expect(http.get).toHaveBeenCalledWith(
			fbSearchEngine.generateUrlForProfiles(query)
		);
	});

	it("should return a profile", async () => {
		const retrievedFbProfile = fbRetrieveProfile;
		const id = "42313231";
		const axiosResponse = {
			data: retrievedFbProfile
		} as AxiosResponse;

		jest.spyOn(http, "get").mockImplementation(() => of(axiosResponse));

		const result = await fbSearchEngine.searchProfile(id).toPromise();
		expect(result).toEqual(retrievedProfile);
		expect(http.get).toHaveBeenCalledTimes(1);
		expect(http.get).toHaveBeenCalledWith(
			fbSearchEngine.generateUrlForProfile(id)
		);
	});

	it("should return bad request when requesting profiles", async () => {
		const query = "bornfight";
		jest.spyOn(http, "get").mockImplementation(() =>
			throwError(new BadRequestException())
		);

		try {
			await fbSearchEngine.searchProfiles(query).toPromise();
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
			expect(e).toHaveProperty("response");
			expect(e.response).toHaveProperty("error");
			expect(e.response.statusCode).toBe(400);
		}
	});
});
