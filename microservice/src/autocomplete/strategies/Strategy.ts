import { IStrategy } from "./interfaces/strategy";

export type StrategyType = "facebook" | "google" | "reddit" | "instagram";

export class Strategy implements IStrategy {
	constructor(private type: StrategyType, private url: string) {}
}
