import axios from "axios";
import {NextRequest, NextResponse} from "next/server";

const API_URL_BY_NAME = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id";
const API_URL_BY_PUUID = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid";
const API_URL_BY_ID = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner";

export async function GET(req: NextRequest, context:any) {
    const {userName, userTag} = context.params;
    const {data} = await axios
        .get(`${API_URL_BY_NAME}/${userName}/${userTag}?api_key=${process.env.API_KEY}`);
    const userData = await axios
        .get(`${API_URL_BY_PUUID}/${data.puuid}?api_key=${process.env.API_KEY}`);
    const summonerData = await axios
        .get(`${API_URL_BY_ID}/${userData.data.id}?api_key=${process.env.API_KEY}`);
    const result = {
        userName: data.gameName,
        userTag: data.tagLine,
        tier: summonerData.data[0].tier,
        rank: summonerData.data[0].rank,
        wins: summonerData.data[0].wins,
        losses: summonerData.data[0].losses,
    }
    return NextResponse.json({
        data: result,
    });
}