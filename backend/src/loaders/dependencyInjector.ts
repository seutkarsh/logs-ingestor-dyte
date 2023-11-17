import Logger from "./logger";
import {Client} from "@elastic/elasticsearch";
import {Container} from "typedi";

export default async (elasticsearchClient: Client) => {
	try {

		Container.set(Client,elasticsearchClient)
		Logger.info("✌️ Dependency Injector loaded");
	} catch (e) {
		Logger.error(`🔥 Error on dependency injector loader: ${e.stack}`);
	}
};
