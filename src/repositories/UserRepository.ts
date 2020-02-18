import { AppUser, UserStatus, UserRole } from "../entities";
import { UserSignup, UserInviteeDto } from "../objects";
import { AppInternalCodeEn } from "../utils";
import { UserInvitee } from "../entities/UserInvitee";

export class UserRepository {
    public getByFirebaseId = async (firebaseId: string) => {
        try {
            const user = await AppUser.query()
                .eager("[roles, userStatus]")
                .where("firebase_uid", firebaseId)
                .first();
            return user;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    };

    public getOnlyUserByEmail = async (email: string) => {
        try {
            const user = await AppUser.query()
                // .eager("[roles, userStatus]")
                .where("email", email)
                .first();
            return user;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public addUser = async (user: UserSignup) => {
        try {
            const insertedUser = await AppUser.query().insert({
                email: user.email,
                mobile_number: user.mobileNumber,
                user_status_id: user.userStatusId,
                username: user.username,
                password: user.password,
                salt: user.salt,
                firebase_uid: user.firebaseId,
            });

            const userRole = await UserRole.query().findOne({ name: "user" });
            await insertedUser.$relatedQuery("roles").relate(userRole!.id);

            return insertedUser;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    };

    public login = async (email: string) => {
        try {
            const updatedUser = await AppUser.query()
                .patch({
                    last_login: new Date(),
                })
                .where("email", "=", email);
            // console.log(" updatedUser: ", updatedUser);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    };

    public updateTermsAndConditions = async (firebaseId: string) => {
        try {
            await AppUser.query().patch({ terms_and_conditions: true }).where("firebase_uid", "=", firebaseId);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async getUserStatuses() {
        try {
            const statuses = await UserStatus.query();
            return statuses;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public checkLogin = async (firebaseId: string) => {
        try {
            const user = await AppUser.query()
                .eager("[roles, userStatus]")
                .where("firebase_uid", "=", firebaseId)
                .first();
            // console.log(" firebaseId: ", firebaseId);
            // console.log(" user: ", user);
            return user;
        }
        catch (e) {
            // console.error(e);
            throw e;
        }
    };

    public getInvitees = async (userId: number) => {
        try {
            const invitees = await UserInvitee.query()
                .where("user_id", "=", userId);

            return invitees;
        }
        catch (e) {
            throw e;
        }
    }

    public async insertInvitees(invitees: UserInviteeDto[]) {
        try {
            const inserts = await UserInvitee.query().insert(invitees);
            return inserts;
        }
        catch (e) {
            throw e;
        }
    }

}
