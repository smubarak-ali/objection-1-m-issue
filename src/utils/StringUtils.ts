import { camelizeKeys } from "humps";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { AppInternalCodeEn } from "./Constants";

const saltRounds = +(process.env.SALT_ROUNDS || 10);

export const camelizeData = (obj: any) => {
    return camelizeKeys(obj);
}

export const getSalt = async () => {
    const salt = await bcrypt.genSalt(saltRounds);
    if (salt) {
        return salt;
    }

    throw new Error("salt is not created");
}

export const getHashedPassword = async (password: string, salt: string) => {
    // const hash = crypto.createHmac("sha512", salt);
    // hash.update(password);
    const hashedPwd = await bcrypt.hash(password, salt);
    if (hashedPwd) {
        return hashedPwd;
    }

    throw new Error("password hash is not created");
}


