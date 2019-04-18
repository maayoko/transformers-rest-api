import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AutocompleteModule } from "../src/autocomplete/autocomplete.module";
import { INestApplication } from "@nestjs/common";

describe("Profile Autocomplete", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AutocompleteModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it(`/POST profile-autocomplete`, async () => {
		const res = await request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebook", query: "bornfight", currentValues: [] })
			.set("Accept", "application/json")
			.expect(200)
			.expect("Content-Type", /json/);

		expect(Array.isArray(res.body)).toBeTruthy();
	});

	it(`/POST profile-autocomplete - exclude selected profiles`, async () => {
		const selectedProfileId = 2186857948260301;
		const res = await request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({
				type: "facebook",
				query: "bornfi",
				currentValues: [selectedProfileId],
			})
			.set("Accept", "application/json")
			.expect(200)
			.expect("Content-Type", /json/);

		expect(Array.isArray(res.body)).toBeTruthy();
		expect(
			!!res.body.find(profile => profile.id === selectedProfileId),
		).toBeFalsy();
	});

	it(`/POST profile-autocompleete - invalid type paramater`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebo", query: "born", currentValues: [] })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);
	});

	it(`/POST profile-autocompleete - invalid query paramater`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebook", query: "", currentValues: [] })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);
	});

	it(`/POST profile-autocompleete - invalid currentValues paramater`, () => {
		return request(app.getHttpServer())
			.post("/profile-autocomplete")
			.send({ type: "facebook", query: "bornfight", currentValues: "" })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);
	});

	it(`/GET profile-autocomplete`, async () => {
		const res = await request(app.getHttpServer())
			.get("/profile-autocomplete")
			.query({ type: "facebook", id: "2186857948260301" })
			.set("Accept", "application/json")
			.expect(200)
			.expect("Content-Type", /json/);

		expect(Object.prototype.toString.call(res.body)).toBe(
			"[object Object]",
		);
	});

	it(`/GET profile-autocomplete - invalid type parameter`, async () => {
		const res = await request(app.getHttpServer())
			.get("/profile-autocomplete")
			.query({ type: "facebo", id: "2186857948260301" })
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);

		expect(res.body.error).toBe("Bad Request");
	});

	it(`/GET profile-autocomplete - nonexisting id parameter`, async () => {
		const res = await request(app.getHttpServer())
			.get("/profile-autocomplete")
			.query({ type: "facebook", id: "24836434872364" })
			.set("Accept", "application/json")
			.expect(400)
			.expect("Content-Type", /json/);

		expect(res.body.error).toBe("Bad Request");
	});

	afterAll(async () => {
		await app.close();
	});
});
