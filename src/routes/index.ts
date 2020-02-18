import { Router } from "express";


import { contentRouter } from "./ContentRoutes";

const routes = Router();

routes.use("/v1/content", contentRouter);

export default routes;
