import { isValidObjectId } from "mongoose";
import { userModel } from "../Models/UserModel";

export const userRegistration = async (
    username: Readonly<string>,
    password: Readonly<string>
) => {
    /**
     * here is a password hash and simple validation
     */
    const doc = await new userModel({
        username,
        password,
    });
    const newUser = await doc.save();
    if (!newUser) {
        return null;
    }
    return newUser;
};
export const userLogin = async (
    username: Readonly<string>,
    password: Readonly<string>
) => {
    const creditails = await userModel.find({ username: username });
    if (!creditails) {
        return null;
    }
    /**
     * password verification
     */
    return creditails;
};
export const userById = async ({ userId }: Readonly<{ userId: string }>) => {
    if (!isValidObjectId(userId)) {
        return null;
    }
    const doc = await userModel.findById(userId);
    if (!doc) {
        return null;
    }
    return doc;
};
