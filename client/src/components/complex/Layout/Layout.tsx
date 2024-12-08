import { Outlet } from "react-router-dom"
import styles from "./Layout.module.scss"

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>

                </header>
                <main className={styles.main}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
