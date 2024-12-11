import { Outlet } from "react-router-dom"
import styles from "./Layout.module.scss"
import { verifyAuth } from "../../../lib/api"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { updateAuth } from "../../../store/actions/userActions"

export const Layout = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     verifyAuth()
    //         .then(res => {
    //             if (res.status == "ok") {
    //                 dispatch(updateAuth(true))
    //             } else {
    //                 dispatch(updateAuth(false))
    //             }
    //         })
    // }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    {
                        !isAuth && <nav className={styles.menu}>
                        <a href="/registration" className={styles.menuItem}>Sign Up</a>
                        <a href="/login" className={styles.menuItem}>Log In</a>
                    </nav>
                    }
                </header>
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
