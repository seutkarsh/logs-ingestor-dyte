import { Router, Request, Response } from "express";
import { ResponseWrapper } from "../responses/responseWrapper";
import Logger from "../../loaders/logger";
import { Container } from "typedi";
import { LogService } from "../../services/LogService/LogService";
import { ILogFields } from "../../services/LogService/LogInterfaces";

export default (router: Router) => {
	const logService = Container.get(LogService);
	router.post("/logs", async (req: Request, res: Response) => {
		const response = new ResponseWrapper();
		try {
			const logFields: ILogFields = {
				level: req.body.level,
				message: req.body.message,
				resourceId: req.body.resourceId,
				timestamp: req.body.timestamp,
				traceId: req.body.traceId,
				spanId: req.body.spanId,
				commit: req.body.commit,
				metadata: { parentResourceId: req.body.parentResourceId },
			};

			const data = await logService.ingestLog(logFields);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});
};
