import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_URL_BY_NAME =
    "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id";
const API_URL_BY_PUUID =
    "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid";
const API_URL_BY_ID =
    "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner";

export async function GET(req: NextRequest, context: any) {
    try {
        const { userName, userTag } = context.params;
        const { data } = await axios.get(
            `${API_URL_BY_NAME}/${userName}/${userTag}?api_key=${process.env.API_KEY}`
        );
        const userData = await axios.get(
            `${API_URL_BY_PUUID}/${data.puuid}?api_key=${process.env.API_KEY}`
        );
        const summonerData = await axios.get(
            `${API_URL_BY_ID}/${userData.data.id}?api_key=${process.env.API_KEY}`
        );
		if(!summonerData.data){
			return NextResponse.json({
				userName,
				userTag,
				tier: "No information aviable",
			})
		}
        const result = {
            userName: data.gameName,
            userTag: data.tagLine,
            tier: summonerData.data[0]?.tier || "unable to get",
            rank: summonerData.data[0]?.rank || "unable to get",
            wins: summonerData.data[0]?.wins || "unable to get",
            losses: summonerData.data[0]?.losses || "unable to get",
        };
        return NextResponse.json({
            data: result,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                data: {
                    message: "Unhandled server error",
                },
            },
            { status: 500 }
        );
    }
}
