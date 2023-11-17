import { Router } from "express";
import log from "./routes/log"
import search from "./routes/search"
export default (): Router => {
	const expressRouter = Router();

	//route groups
	log(expressRouter);
	search(expressRouter)
	return expressRouter;
};
