import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        leagueProfile: {
            type: String,
        },
        githubProfile: {
            type: String,
        },
        otherApi: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
export const userModel =
    mongoose.models.Users || mongoose.model("Users", UserSchema);
