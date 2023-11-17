import { Client } from "@elastic/elasticsearch";
import config from "../config";

export default (): Client => {
	return new Client({
		node: config.elasticsearch.url,
		maxRetries: 2,
		pingTimeout: 3000,
		requestTimeout: 6000,
		compression: true,
	});
};
