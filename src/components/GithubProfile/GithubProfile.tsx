import styles from "./GithubProfile.module.css";
import Image from "next/image";
interface PropType {
    avatarUrl: string;
    login: string;
    publicReposAmount: string | number;
}
export const GithubProfile = ({ props }: { props: PropType }) => {
    return (
        <main className={styles.container}>
            <Image
                width={200}
                height={200}
                src={props.avatarUrl}
                alt="here pfp"
            />
            <h2>Login: {props.login}</h2>
            <h3>Public repos: {props.publicReposAmount}</h3>
        </main>
    );
};
