import { Model, RelationMappings } from "objection";
import { join } from "path";

import { AppUser } from "./AppUser";

export class UserRole extends Model {

    public readonly id: number;
    public name: string;
    public users?: AppUser[];

    public static tableName = "user_role";
    public static relationMappings: RelationMappings = {
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: join(__dirname, "AppUser"),
            join: {
                from: "user_role.id",
                through: {
                    from: "users_in_roles.role_id",
                    to: "users_in_roles.user_id",
                },
                to: "app_user.id",
            },
        },
    }
}
