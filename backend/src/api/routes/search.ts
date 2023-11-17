import { Router, Request, Response } from "express";
import { ResponseWrapper } from "../responses/responseWrapper";
import Logger from "../../loaders/logger";
import { Container } from "typedi";
import { ILogFields } from "../../services/LogService/LogInterfaces";
import {SearchService} from "../../services/SearchService/SearchService";

export default (router: Router) => {
	const searchService = Container.get(SearchService);
	router.post("/search", async (req: Request, res: Response) => {
		const response = new ResponseWrapper();
		try {
			const searchQuery: string = req.body.searchQuery;
			const levelFilter :string = req.body.levelFilter


			const data = await searchService.search(searchQuery,levelFilter);
			response.setData(data);
		} catch (e) {
			Logger.error(e.message);
			response.setError(e.message);
		}
		res.json(response);
	});
};
