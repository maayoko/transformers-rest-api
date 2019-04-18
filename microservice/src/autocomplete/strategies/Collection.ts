import { Injectable } from "@nestjs/common";
import { IStrategy } from "./interfaces/strategy";
import { SearchStrategy } from "./Strategy";
import { SearchEngine, SearchEngineType } from "./interfaces/search-engine";
import { FacebookSearchEngine } from "./searchEngines/facebook.engine";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class StrategyCollection {
	private readonly strategies: Map<SearchEngineType, IStrategy> = new Map();

	constructor(
		fbSearchEngine: FacebookSearchEngine,
		private moduleRef: ModuleRef
	) {
		this.createStrategies([...arguments] as SearchEngine[]);
	}

	createStrategies(searchEngines: SearchEngine[]): void {
		for (let searchEngine of searchEngines) {
			const { type } = searchEngine;
			this.strategies.set(type, new SearchStrategy(searchEngine));
		}
	}

	getStrategy(type: SearchEngineType): IStrategy | undefined {
		const strategy = this.strategies.get(type);
		console.log(this.moduleRef.get(FacebookSearchEngine));
		return strategy;
	}
}
