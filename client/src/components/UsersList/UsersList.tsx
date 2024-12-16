import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './UsersList.module.scss'
import { getAllUsers, getChat } from '../../lib/api'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setCurrentChat, setUsers } from '../../store/actions/userActions'
import { IChat, IUser } from '../../lib/types'

type Tab = "all" | "conversations"

interface IProps {
    select:(selected:string) => void
}

export const UsersList = ({select}:IProps) => {
    const [tab, setTab] = useState<Tab>("all")

    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.user.users)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (currentUser) {
            getAllUsers()
                .then(res => {
                    const users = (res.data as IUser[]).filter(user => user._id !== currentUser?._id)
                    dispatch(setUsers(users))
                })
        }
    }, [currentUser])

    const handleChangeTab = (tab: Tab) => {
        setTab(tab)
    }

    const handleGetChat = async (currentUser: string, selected: string) => {
        select(selected)
        const response = await getChat([currentUser, selected])

        if (response.status == "ok") {
            dispatch(setCurrentChat(response.data as IChat))
        }else{
            dispatch(setCurrentChat(null))
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} button`}
                    onClick={() => handleChangeTab("all")}
                    style={tab == "all" ? { background: "#DEE2E6", color:"#343A40"} : undefined}
                >
                    All Users
                </button>

                <button
                    className={`${styles.tab} button`}
                    onClick={() => handleChangeTab("conversations")}
                    style={tab == "conversations" ? { background: "#DEE2E6", color:"#343A40"} : undefined}
                >
                    Conversations
                </button>
            </div>
            <div className={styles.list}>
                {
                    tab == "all" ? users.map(user => <div
                        key={user._id}
                        className={styles.userBlock}
                        onClick={() => handleGetChat(currentUser?._id as string, user._id as string)}
                    >
                        {user.username}
                    </div>) : ""
                }
            </div>
        </div>
    )
}
