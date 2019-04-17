import { Injectable } from "@nestjs/common";
import { IStrategy } from "./interfaces/strategy";
import { SearchStrategy } from "./Strategy";
import { IUrlGenerator, UrlGeneratorType } from "./interfaces/url.generator";
import { FacebookUrlGenerator } from "./urlGenerators/facebook.generator";

@Injectable()
export class StrategyCollection {
	private readonly strategies: Map<UrlGeneratorType, IStrategy> = new Map();

	constructor(fbUrlGenerator: FacebookUrlGenerator) {
		this.createStrategies([...arguments] as IUrlGenerator[]);
	}

	createStrategies(urlGenerators: IUrlGenerator[]): void {
		for (let urlGenerator of urlGenerators) {
			const { type } = urlGenerator;
			this.strategies.set(type, new SearchStrategy(urlGenerator));
		}
	}

	getStrategy(type: UrlGeneratorType): IStrategy | undefined {
		const strategy = this.strategies.get(type);
		return strategy;
	}
}
