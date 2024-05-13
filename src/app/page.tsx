"use client";
import styles from "./page.module.css";
import {useState, useEffect, FormEvent} from "react";
import axiosInstance from "@/lib/AppAxios/AppAxios";

export default function Home() {
    const [apiData, setApiData] = useState<any>("");
    const [userName, setUserName] = useState<string>("");
    const [userTag, setUserTag] = useState<string>("");
    const [githubName, setGithubName] = useState<string>("");
    const getLeagueProfile = async (e: FormEvent) => {
        e.preventDefault();
        const {data} = await axiosInstance.get(`/api/riot/${userName}/${userTag}`);
        setApiData(data.data);
    }
    const getGithubProfile = async (e: FormEvent) => {
        e.preventDefault();
        const {data} = await axiosInstance.get(`/api/github/${githubName}`);
        console.log(data);
    }
    return (
        <main>
            <form onSubmit={getLeagueProfile}>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}/>
                <input
                    type="text"
                    value={userTag}
                    onChange={(e) => setUserTag(e.target.value)}/>
                <input
                    type="submit"/>
            </form>
            <h4>
                {apiData.userName}#{apiData.userTag}
                <br/>
                {apiData.tier} {apiData.rank}
                <br/>
                wins: {apiData.wins} | losses: {apiData.losses}
            </h4>
            <form onSubmit={getGithubProfile}>
                <input
                    type="text"
                    value={githubName}
                    onChange={(e) => setGithubName(e.target.value)}/>
                <input
                    type="submit"/>
            </form>
            <h4>

            </h4>
        </main>
    );
}
