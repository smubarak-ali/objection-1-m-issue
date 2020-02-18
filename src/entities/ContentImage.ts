import { Model, RelationMappings } from "objection";
import { join } from "path";

import { Content } from "./Content";

export class ContentImage extends Model {
    public readonly id: number;
    public contentId: number;
    public contentRefId: number;
    public image: string;

    public content?: Content;

    public static tableName = "content_images";
    public static relationMappings: RelationMappings = {
        content: {
            relation: Model.BelongsToOneRelation,
            modelClass: join(__dirname, "Content"),
            join: {
                from: "content_images.content_id",
                to: "content.id",
            },
        },
    }
}
