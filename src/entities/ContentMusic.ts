import { Model, RelationMappings } from "objection";
import { Content } from "./Content";
import { join } from "path";

export class ContentMusic extends Model {
    public readonly id: number;
    public musicType: "express"|"spectral"|"space";
    public musicFileUrl: string;

    public contents: Content[];

    public static tableName = "content_music";
    public static relationMappings: RelationMappings = {
        contents: {
            relation: Model.ManyToManyRelation,
            modelClass: join(__dirname, "Content"),
            join: {
                from: "content_music.id",
                through: {
                    from: "music_in_content.content_music_id",
                    to: "music_in_content.content_id",
                },
                to: "content.id",
            },
        },
    }
}
