import { useAppSelector } from "../../../store/store";
import styles from "./Layout.module.scss"
import { FaChild } from "react-icons/fa";

export const Layout = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const currentUser = useAppSelector(state => state.user.currentUser)
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.logo}>
                        <FaChild size={30}/>
                        <h1>Hi!</h1>
                    </div>
                    {
                        !isAuth ? <nav className={styles.menu}>
                            <a href="/registration" className={styles.menuItem}>Sign Up</a>
                            <a href="/login" className={styles.menuItem}>Log In</a>
                        </nav> 
                        : 
                        <div className={styles.username}>
                            {
                                <h2>{currentUser?.username}</h2>
                            }
                        </div>
                    }
                </header>
            </div>
        </div>
    )
}
