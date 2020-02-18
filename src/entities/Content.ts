import { Model, RelationMappings } from "objection";
import { ContentImage } from "./ContentImage";
import { ContentMusic } from "./ContentMusic";

export class Content extends Model {
    public readonly id: number;
    public category: "fiveSteps"|"music"|"empowerment"|"advance";
    public refId: number;
    public title: string;
    public content: string;
    public infoMessage: string;

    public music?: ContentMusic[];
    public images?: ContentImage[];

    public static tableName = "content";
    public static modelPaths = [__dirname]
    public static relationMappings: RelationMappings = {
        music: {
            relation: Model.ManyToManyRelation,
            modelClass: "ContentMusic",
            join: {
                from: "content.id",
                through: {
                    from: "music_in_content.content_id",
                    to: "music_in_content.content_music_id",
                },
                to: "content_music.id",
            },
        },
        images: {
            relation: Model.HasManyRelation,
            modelClass: "ContentImage",
            join: {
                from: "content.id",
                to: "content_images.content_id",
            },
        },
    }
}
