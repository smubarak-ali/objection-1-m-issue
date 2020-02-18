import { Model, RelationMappings } from "objection";
import { AppUser } from "./AppUser";
import { join } from "path";

export class UserInvitee extends Model {
    public readonly id: number;
    public user_id: number;
    public email: string;

    // public users?: AppUser[];

    public static tableName = "user_invitee";
    // public static modelPaths = [__dirname];
    // public static relationMappings: RelationMappings = {
    //     users: {
    //         relation: Model.HasManyRelation,
    //         modelClass: join(__dirname, "AppUser"),
    //         join: {
    //             from: "user_invitee.user_id",
    //             to: "app_user.id",
    //         },
    //     },
    // }
}
