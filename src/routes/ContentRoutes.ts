import { Router } from "express";

import {ContentController} from "../controllers/ContentController";
const contentController = new ContentController();

const contentRouter = Router();
contentRouter.get("/", contentController.getContent);

export {contentRouter};
