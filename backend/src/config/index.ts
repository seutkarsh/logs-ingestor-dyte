import dotenv from "dotenv";
import * as process from "process";

const envFound = dotenv.config();

if (!envFound) {
	throw new Error("⚠️ Couldn't Find ENV File ⚠️");
}

export default {
	apiEndpoint: process.env.API_ENDPOINT || "http://localhost",
	port: parseInt(process.env.PORT || "3000", 10) || 3000,
	logs: {
		level: process.env.LOG_LEVEL || "silly",
	},
	elasticsearch:{
		url:process.env.ES_URL || "http://localhost:9200",

	}
};
