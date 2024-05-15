"use client";
import styles from "./page.module.css";
import { useState, useEffect, FormEvent } from "react";
import axiosInstance from "@/lib/AppAxios/AppAxios";
import { LolProfile } from "@/components/LolProfile/LolProfile";
import { GithubProfile } from "@/components/GithubProfile/GithubProfile";

interface ITempGit {
    avatarUrl: string;
    login: string;
    publicReposAmount: string | number;
}
export default function Home() {
    const [apiData, setApiData] = useState<any>(null);
    const [userName, setUserName] = useState<string>("");
    const [userTag, setUserTag] = useState<string>("");
    const [githubName, setGithubName] = useState<string>("");
    const [githubApiData, setGithubData] = useState<ITempGit | null>(null);
    const getLeagueProfile = async (e: FormEvent) => {
        e.preventDefault();
        const { data } = await axiosInstance.get(
            `/api/riot/${userName}/${userTag}`
        );
        console.log(data);
        setApiData(data.data);
    };
    const getGithubProfile = async (e: FormEvent) => {
        e.preventDefault();
        const { data } = await axiosInstance.get(`/api/github/${githubName}`);
        console.log(data);
        setGithubData({
            avatarUrl: data.avatar_url,
            login: data.login,
            publicReposAmount: data.public_repos,
        });
    };
    return (
        <main>
            <form onSubmit={getLeagueProfile}>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="text"
                    value={userTag}
                    onChange={(e) => setUserTag(e.target.value)}
                />
                <input type="submit" />
            </form>
            {apiData && <LolProfile props={apiData} />}
            <form onSubmit={getGithubProfile}>
                <input
                    type="text"
                    value={githubName}
                    onChange={(e) => setGithubName(e.target.value)}
                />
                <input type="submit" />
            </form>
            {githubApiData && <GithubProfile props={githubApiData} />}
        </main>
    );
}
