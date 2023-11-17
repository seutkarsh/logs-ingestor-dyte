import { Container, Service } from "typedi";
import { ILogFields } from "./LogInterfaces";
import { Client } from "@elastic/elasticsearch";
import { v4 as uuidv4 } from "uuid";

@Service()
export class LogService {
	private esClient = Container.get(Client);
	async ingestLog(log: ILogFields) {
		const doc = await this.esClient.create({
			index: "logs",
			id: this.generateUniqueId(),
			document: log,
		});
		return doc;
	}

	private generateUniqueId(): string {
		return uuidv4();
	}
}
