import { useState } from 'react'
import { UsersList } from '../UsersList/UsersList'
import styles from './Chat.module.scss'
import { useAppSelector } from '../../store/store'

export const Chat = () => {
  const [text,setText] = useState<string>("")
  const [userSelected, setUserSelected] = useState<boolean>(false)
  const currentChat = useAppSelector(state => state.user.currentChat)

  const handleSelectUser = () => {
    if (!userSelected) {
      setUserSelected(true)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.list}>
          <UsersList select={handleSelectUser} />
        </div>
        <div className={styles.block}>
          {
            userSelected ? <>
              <div className={styles.chat}>
                {
                  currentChat ? <div>

                  </div> : <div className={styles.welcome}>
                      <h2>Start a Conversation</h2>
                      <button className={styles.helpMessage} onClick={() => setText("Hi!")}>Hi!</button>
                      <button className={styles.helpMessage} onClick={() => setText("What’s up?")}>What’s up?</button>
                      <button className={styles.helpMessage} onClick={() => setText("Hey, how are you?")}>Hey, how are you?</button>
                  </div>
                }
              </div>

              <div className={styles.actions}>
                <div className={styles.actionsContainer}>
                  <input
                    type="text"
                    className={styles.field}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button className={styles.sendBtn}>Send</button>
                </div>
              </div>
            </>
              :
              <div className={styles.welcome}>
                <h2>Start a Conversation</h2>
              </div>
          }

        </div>
      </div>
    </div>
  )
}
