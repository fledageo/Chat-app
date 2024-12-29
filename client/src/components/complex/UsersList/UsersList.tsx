import { useEffect, useState } from 'react'
import styles from './UsersList.module.scss'
import { getAllUsers, getChat, getConversations } from '../../../lib/api'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { setCurrentChat, setUserConversations, setUsers } from '../../../store/actions/userActions'
import { ConversationData, IChat, ISelectedUser, IUser } from '../../../lib/types'
import { UserDisplay } from '../../simple/UserDisplay/UserDisplay'

type Tab = "all" | "conversations"

interface IProps {
    select: (selected: ISelectedUser) => void
}

export const UsersList = ({ select }: IProps) => {
    const [tab, setTab] = useState<Tab>("all")

    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.user.users)
    const conversations = useAppSelector(state => state.user.conversations)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (currentUser) {
            getAllUsers()
                .then(res => {
                    const users = (res.data as IUser[]).filter(user => user._id !== currentUser?._id)
                    dispatch(setUsers(users))
                    getConversations(currentUser._id as string)
                        .then(res => {
                            const conversations = res.data as ConversationData
                            const conversationsWith = conversations.map(elm => {
                                return elm.participants.find(user => user !== currentUser._id)
                            })

                            dispatch(setUserConversations(conversationsWith as string[]))
                        })
                })
        }
    }, [currentUser])

    const handleChangeTab = (tab: Tab) => {
        setTab(tab)
    }

    const handleGetChat = async (currentUser: string, selected: ISelectedUser) => {
        select(selected)
        const response = await getChat([currentUser, selected.userId])

        if (response.status == "ok") {
            dispatch(setCurrentChat(response.data as IChat))
        } else {
            dispatch(setCurrentChat("start"))
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} button`}
                    onClick={() => handleChangeTab("all")}
                    style={tab == "all" ? { background: "#DEE2E6", color: "#343A40" } : undefined}
                >
                    All Users
                </button>

                <button
                    className={`${styles.tab} button`}
                    onClick={() => handleChangeTab("conversations")}
                    style={tab == "conversations" ? { background: "#DEE2E6", color: "#343A40" } : undefined}
                >
                    Conversations
                </button>
            </div>
            <div className={styles.list}>
                {
                    tab == "all" ? users.map(user => 
                        <div
                            key={user._id}
                            className={styles.userBlock}
                            onClick={() => handleGetChat(currentUser?._id as string, { userId: user._id, username: user.username } as ISelectedUser)}
                        >

                            <UserDisplay user={user}/>
                        </div>)

                        :

                        users.map(user => {
                            if (conversations.includes(user._id as string)) {
                                return <div
                                key={user._id}
                                className={styles.userBlock}
                                onClick={() => handleGetChat(currentUser?._id as string, { userId: user._id, username: user.username } as ISelectedUser)}
                            >
    
                                <UserDisplay user={user}/>
                            </div>}
                            
                            return null
                        })
                }
            </div>
        </div>
    )
}
