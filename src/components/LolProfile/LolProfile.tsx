import styles from "./LolProfile.module.css";

interface propsType {
    userName: string;
    userTag: string;
    rank?: string | null;
    tier?: string | null;
    wins?: string | null;
    losses?: string | null;
}
export const LolProfile = ({ props }: { props: propsType }) => {
    //props.tier = "GOLD";
    const colorSchema = props.tier === "unable to get" ? "default" : props.tier?.toLowerCase();
    return (
        <>
            <main className={`${styles.container} ${styles[colorSchema||"default"]}`}>
                <h2>
                    {props.userName}#{props.userTag}
                </h2>
                <h3>
                    {props.tier} {props?.rank}
                </h3>
                <div className={styles.wr}>
                    <h3>
                        wins: {props?.wins}
                    </h3>
                    <h3>
                        losses: {props?.losses}
                    </h3>
                </div>
            </main>
        </>
    );
};
