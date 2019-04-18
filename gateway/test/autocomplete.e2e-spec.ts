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
			.query({ type: "facebook", id: "2186857948260301" })
			.set("Accept", "application/json")
			.expect(200)
			.expect("Content-Type", /json/)
			.then(res => {
				expect(Object.prototype.toString.call(res.body)).toBe(
					"[object Object]",
				);
			});
	});

	it(`POST profile-autocompleete - invalid type paramater`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebo", query: "born", currentValues: [] })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);
	});

	it(`POST profile-autocompleete - invalid query paramater`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebook", query: "", currentValues: [] })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);
	});

	it(`POST profile-autocompleete - invalid currentValues paramater`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebook", query: "", currentValues: "" })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);
	});

	afterAll(async () => {
		await app.close();
	});
});
