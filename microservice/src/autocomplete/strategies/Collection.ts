import { Injectable } from "@nestjs/common";
import { IStrategy } from "./interfaces/strategy";
import { Strategy, StrategyType } from "./Strategy";

import * as strategies from "../../config/strategies.json";

type StrategyList = { type: StrategyType; url: string }[];

@Injectable()
export class StrategyCollection {
	constructor(private readonly strategies: Map<StrategyType, IStrategy>) {
		this.createStrategies();
	}

	createStrategies(): void {
		const strategyList: StrategyList = strategies as StrategyList;
		for (let strategy of strategyList) {
			const { type, url } = strategy;
			this.strategies.set(type, new Strategy(type, url));
		}
	}

	getStrategy(type: StrategyType): IStrategy | undefined {
		const strategy = this.strategies.get(type);
		return strategy;
	}
}
