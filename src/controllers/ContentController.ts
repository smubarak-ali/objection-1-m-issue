import { Request, Response } from "express";
import { OK, BAD_REQUEST } from "http-status-codes";

import { ContentService } from "../services";
import { camelizeData, ApiResponseCode } from "../utils";
import { ApiResponse } from "../objects";

export class ContentController {
    private readonly contentService: ContentService;

    constructor() {
        this.contentService = new ContentService();
    }

    public getContent = async (req: Request, resp: Response) => {
        try {
            const list = await this.contentService.getContent("fiveSteps");
            // console.log(" list: ", list);
            resp.status(200).send(camelizeData(list));
        }
        catch (e) {
            const respObj: ApiResponse = { code: ApiResponseCode.ERROR };
            console.error(e);
            resp.status(BAD_REQUEST).send(camelizeData(respObj));
        }
    }
}