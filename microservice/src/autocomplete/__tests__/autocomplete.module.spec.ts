import { Test } from "@nestjs/testing";
import { ProfileAutocompleteController } from "../autocomplete.controller";
import { ProfileAutocompleteService } from "../autocomplete.service";
import { GetProfilesDto } from "../dto/get-profiles-dto";
import { RetrieveProfileDto } from "../dto/retrieve-profile-dto";
import { of } from "rxjs";
import { GetProfileDto } from "../dto/get-profile-dto";

describe("Autocomplete controller", () => {
	let autocompleteController: ProfileAutocompleteController;
	let autocompleteService: ProfileAutocompleteService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [ProfileAutocompleteController],
			providers: [ProfileAutocompleteService]
		}).compile();

		autocompleteController = module.get<ProfileAutocompleteController>(
			ProfileAutocompleteController
		);
		autocompleteService = module.get<ProfileAutocompleteService>(
			ProfileAutocompleteService
		);
	});

	afterEach(() => {});

	describe("getProfiles", () => {
		const validSearchParams = new GetProfilesDto();
		validSearchParams.type = "facebook";
		validSearchParams.query = "bornfight";
		validSearchParams.currentValues = [];

		const validSearchParam = new GetProfileDto();
		validSearchParam.id = "23123242";
		validSearchParam.type = "facebook";

		const retrievedProfile = new RetrieveProfileDto();
		retrievedProfile.id = "42313231";
		retrievedProfile.imageUrl =
			"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/40485009_2186768654935897_6542385890856009728_n.png?_nc_cat=100&_nc_ht=scontent.xx&oh=b1197042a89359949ab1d26db67139ce&oe=5D3DEA82";
		retrievedProfile.name = "Bornfight";
		retrievedProfile.subscribers = 1940;

		it("should return an array of profiles", async () => {
			const profiles = [retrievedProfile];
			jest.spyOn(autocompleteService, "getProfiles").mockImplementation(
				() => of(profiles)
			);

			const result = await autocompleteController
				.getProfiles(validSearchParams)
				.toPromise();

			expect(result).toBe(profiles);
			expect(result).toHaveLength(1);
			expect(result).toContain(retrievedProfile);
			expect(autocompleteService.getProfiles).toHaveBeenCalledTimes(1);
			expect(autocompleteService.getProfiles).toHaveBeenCalledWith(
				validSearchParams
			);
		});

		it("should return response with not found exception", async () => {
			const invalidSearchParams = Object.assign(validSearchParams);
			invalidSearchParams.type = "linkedin";

			await autocompleteController
				.getProfiles(invalidSearchParams)
				.toPromise()
				.catch(err => {
					expect(err.response).toHaveProperty("error");
					expect(err.response.statusCode).toBe(404);
				});
		});

		it("should return a profile", async () => {
			jest.spyOn(autocompleteService, "getProfile").mockImplementation(
				() => of(retrievedProfile)
			);

			const result = await autocompleteController
				.getProfile(validSearchParam)
				.toPromise();

			expect(result).toBe(retrievedProfile);
			expect(autocompleteService.getProfile).toHaveBeenCalledTimes(1);
			expect(autocompleteService.getProfile).toHaveBeenCalledWith(
				validSearchParam
			);
		});
	});
});
