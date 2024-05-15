import axios from "axios";
import {NextRequest, NextResponse} from "next/server";

const API_URL = "https://api.github.com/users";

export async function GET(req: NextRequest, context: any) {
    const {userName} = context.params;
    const {data} = await axios.get(`${API_URL}/${userName}`);
    return NextResponse.json(data);
}