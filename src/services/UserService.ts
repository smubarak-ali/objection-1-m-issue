import { UserSignup, UserInviteeDto } from "../objects";
import { AppInternalCodeEn, ErrorRetrievingFromDbException, getSalt, getHashedPassword, InvalidCredentialException, ApiResponseCode } from "../utils";
import { UserRepository } from "../repositories";
import { UserInvitee } from "../entities/UserInvitee";

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async login(firebaseId: string) {
    const user = await this.userRepository.getByFirebaseId(firebaseId);
    // console.log(" user: ", user);
    if (!user) {
      throw new InvalidCredentialException("");
    }

    // const hashedPwd = await getHashedPassword(password, user.salt);
    // const matched = hashedPwd === user.password;
    // console.log(" password matched: ", matched);
    // if (!matched) {
    //   throw new InvalidCredentialException(ApiResponseCode.INVALID_USER_CREDENTIALS);
    // }

    await this.userRepository.login(user.email);
    return { roles: user.roles, username: user.username, termsAndConditions: user.terms_and_conditions };
  }

  public async signupUser(signup: UserSignup) {
    const statuses = await this.userRepository.getUserStatuses();
    if (statuses == null) {
      throw new ErrorRetrievingFromDbException(AppInternalCodeEn.no_status_retrieved);
    }

    const activeStatus = statuses.find((x) => x.name === "active");
    signup.userStatusId = activeStatus!.id;
    // const salt = await getSalt();
    // const hashed = await getHashedPassword(signup.password, salt);
    signup.password = " ";
    signup.salt = " ";
    const insertedUser = await this.userRepository.addUser(signup);
    return insertedUser;
  }

  public async updateTermsAndConditions (firebaseId: string) {
    await this.userRepository.updateTermsAndConditions(firebaseId);
  }

  public async getUserOnlyByEmail(email: string) {
    const user = await this.userRepository.getOnlyUserByEmail(email);
    return user;
  }

  public async getUserInvitees(userId: number) {
    const list: UserInviteeDto[] = []; 
    const invitees = await this.userRepository.getInvitees(userId);
    if (invitees) {
      invitees.forEach(x => {
        list.push({ id: x.id, email: x.email, userId });
      })
    }
    return list;
  }

  public async insertInvitees(invitees: UserInviteeDto[]){
    const list: UserInvitee[] = [];
    return this.userRepository.insertInvitees(invitees);
  }
}
