import { Injectable } from "@nestjs/common";
import { IStrategy } from "./interfaces/strategy";
import { Strategy, StrategyType } from "./Strategy";
import { urlFactory } from "./facebook/url.generator.factory";

import * as strategies from "../../config/strategies.json";

type StrategyList = { type: StrategyType; url: string }[];

@Injectable()
export class StrategyCollection {
	private readonly strategies: Map<StrategyType, IStrategy> = new Map();

	constructor() {
		this.createStrategies();
	}

	createStrategies(): void {
		const strategyList: StrategyList = strategies as StrategyList;
		for (let strategy of strategyList) {
			const { type, url } = strategy;
			this.strategies.set(type, new Strategy(type, urlFactory(type)));
		}
	}

	getStrategy(type: StrategyType): IStrategy | undefined {
		const strategy = this.strategies.get(type);
		return strategy;
	}
}
