import { IUser } from '../../../lib/types'
import { useAppSelector } from '../../../store/store'
import styles from './UserDisplay.module.scss'
import { RiRadioButtonLine } from "react-icons/ri";
import { TbMessage2Down } from "react-icons/tb";
interface IProps {
    user: IUser
}

export const UserDisplay = ({ user }: IProps) => {
    const newMessages = useAppSelector(state => state.user.newMessages)
    const actives = useAppSelector(state => state.user.activeUsers)

    return (
        <>

            <span>
                {user.username}
            </span>

            <div className={styles.info}>
                {
                    (user._id && (user._id as string) in newMessages) &&
                    <div className={styles.newMessages}>
                        {
                            <TbMessage2Down />
                        }
                    </div>
                }


                <div className={styles.isOnlineIcon}>
                    <RiRadioButtonLine color={`${actives.includes(user._id as string) ? "green" : "red"}`} />
                </div>
            </div>
        </>
    )
}
