import { Model, RelationMappings } from "objection";

import { UserStatus } from "./UserStatus";
import { UserRole } from "./UserRole";
import { UserInvitee } from "./UserInvitee";
import { join } from "path";

export class AppUser extends Model {
  public readonly id: number;
  public email: string;
  public user_status_id: number;
  public is_deleted = false;
  public username?: string;
  public password: string;
  public salt: string;
  public mobile_number?: string;
  public last_login?: Date;
  public profile_img?: string;
  public thumbnail?: string;
  public firebase_uid?: string;
  public terms_and_conditions: boolean;

  public userStatus?: UserStatus;
  public roles?: UserRole[];
  // public userInvitees?: UserInvitee[];

  public static tableName = "app_user";
  public static modelPaths = [__dirname];
  public static relationMappings: RelationMappings = {
    userStatus: {
      relation: Model.BelongsToOneRelation,
      modelClass: "UserStatus",
      join: {
        from: "app_user.user_status_id",
        to: "user_status.id"
      },
    },
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: "UserRole",
      join: {
        from: "app_user.id",
        through: {
          from: "users_in_roles.user_id",
          to: "users_in_roles.role_id"
        },
        to: "user_role.id",
      },
    },
    // userInvitees: {
    //   relation: Model.BelongsToOneRelation,
    //   modelClass: join(__dirname, "UserInvitee"),
    //   join: {
    //     from: "app_user.id",
    //     to: "user_invitee.user_id",
    //   },
    // },
  };
}
