import { Model, RelationMappings } from "objection";
import { join } from "path";

import { AppUser } from "./AppUser";

export class UserStatus extends Model {

    public id: number;

    public name: string;

    public users?: AppUser[];

    public static tableName = "user_status";

    public static relationMappings: RelationMappings = {
        users: {
            relation: Model.HasManyRelation,
            modelClass: join(__dirname, "AppUser"),
            join: {
                from: "user_status.id",
                to: "app_user.user_status_id",
            },
        },
    }
}
