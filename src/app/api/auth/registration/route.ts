import { NextRequest, NextResponse } from "next/server";
import { userRegistration } from "@/lib/controllers/UserController";

export async function POST(request: NextRequest) {
    try {
        const { data } = await request.json();
        if (!data) {
            return NextResponse.json(
                {
                    message: "BAD_REGISTRATION_CREDITAILS",
                },
                { status: 400 }
            );
        }
        const { username, password } = data;
        const userCreditails = await userRegistration(username, password);
        if (!userCreditails) {
            return NextResponse.json(
                { message: "Bad creditails" },
                { status: 400 }
            );
        }
        return NextResponse.json(userCreditails, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Unhandled server error",
            },
            {
                status: 500,
            }
        );
    } finally {
        console.log("Registration attempt");
    }
}
