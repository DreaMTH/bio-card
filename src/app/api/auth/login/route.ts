import { NextRequest, NextResponse } from "next/server";
import { userLogin } from "@/lib/controllers/UserController";

export async function POST(request: NextRequest) {
    try {
        const { data } = await request.json();
        const { username, password } = data;
        const creditails = await userLogin(username, password);
        if (!creditails) {
            return NextResponse.json(
                {
                    message: "BAD AUTH",
                },
                { status: 403 }
            );
        }
        return NextResponse.json({ creditails }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Unhandled server error",
            },
            { status: 500 }
        );
    } finally {
        console.log("Authentification attempt");
    }
}
