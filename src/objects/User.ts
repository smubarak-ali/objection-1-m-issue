export interface User {
    id: number;
    firebase_uid: string;
    email: string;
    name?: string;
    mobile_number?: string;
    last_login?: Date;
}

export interface UserSignup {
    email: string;
    mobileNumber?: string;
    username?: string;
    password: string;
    salt?: string;
    userStatusId?: number;
    firebaseId: string;
}

export interface UserInviteeDto {
    id?: number;
    userId: number;
    email: string;
}
