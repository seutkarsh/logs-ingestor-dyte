import { Container, Service } from "typedi";
import { Client } from "@elastic/elasticsearch";
import {QueryDslQueryContainer} from "@elastic/elasticsearch/lib/api/types";

@Service()
export class SearchService {
	private esClient = Container.get(Client);
	async search(query: string, levelFilter: string) {

		const mustQueries:QueryDslQueryContainer[] = [{
			multi_match: {
				query,
				fields: [
					"message",
					"level",
					"resourceId",
					"traceId",
					"spanId",
					"commit",
					"metadata.parentResourceId",
				],
			},
		}]
		if(levelFilter) mustQueries.push({match:{level: levelFilter}})
		const result = await this.esClient.search({
			index: "logs",

			query: {
				bool: {
					must: mustQueries,
				},

			},
		});

		return result.hits.hits
	}
}
