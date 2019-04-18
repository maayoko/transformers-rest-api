import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AutocompleteModule } from "../src/autocomplete/autocomplete.module";
import { AutocompleteService } from "../src/autocomplete/autocomplete.service";
import { INestApplication } from "@nestjs/common";

describe("Profile Autocomplete", () => {
	let app: INestApplication;
	let profileAutocompleteService = {
		getProfiles: () => ["test"],
		getProfile: () => "test",
	};

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AutocompleteModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it(`/POST profile-autocomplete`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebook", query: "bornfight", currentValues: [] })
			.set("Accept", "application/json")
			.expect(200)
			.expect("Content-Type", /json/)
			.then(res => {
				expect(Array.isArray(res.body)).toBeTruthy();
			});
	});

	it(`/GET profile-autocomplete`, () => {
		return request(app.getHttpServer())
			.get("/profile-autocomplete")
			.query({ type: "facebook", id: "384729834" })
			.set("Accept", "application/json")
			.expect(200)
			.then(res => {
				expect(Array.isArray(res.body)).toBeTruthy();
			});
	});

	afterAll(async () => {
		await app.close();
	});
});
