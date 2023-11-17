import { Application } from "express";
import expressLoader from "./express";
import Logger from "./logger";
import DependencyInjector from "./dependencyInjector";
import {Client} from "@elastic/elasticsearch";
import elasticSearchLoader from "./elasticsearch"

export default async (expressApp: Application): Promise<void> => {
	const esClient: Client =
		elasticSearchLoader()

	Logger.info("✌️ DB Loaded ✌️");
	await DependencyInjector(esClient);
	Logger.info("✌️ Dependency Loaded ✌️");
	await expressLoader(expressApp);
	Logger.info("✌️ Express Loaded ✌️");
};
