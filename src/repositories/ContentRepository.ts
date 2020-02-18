import { Content } from "../entities";
import { AppConfig } from "../config/AppConfig";

export class ContentRepository {
    public async getContent(category: string) {
        const content = await Content.query()
            .withGraphFetched("[images, music]")
            .where("category", "=", category).debug();
        
        // console.log(" content: ", content);
        return content;

        // const content = await Content.$relatedQuery("images").where("category", "=", category);
        // console.log(" content: ", content);
        // return content;
    }
}
