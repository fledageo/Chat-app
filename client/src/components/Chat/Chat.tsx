import { useEffect, useRef, useState } from 'react'
import { UsersList } from '../UsersList/UsersList'
import styles from './Chat.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setActives, setCurrentChat, setNewMessage} from '../../store/actions/userActions'
import { IChat } from '../../lib/types'

export const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [text, setText] = useState<string>("")
  const [userSelected, setUserSelected] = useState<string | null>(null)
  

  const currentChat = useAppSelector(state => state.user.currentChat)
  const currentUser = useAppSelector(state => state.user.currentUser)
  const newMessage = useAppSelector(state => state.user.newMessages)
  const dispatch = useAppDispatch()

  const chatRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (currentUser) {
      const ws = new WebSocket("ws://localhost:5000")

      ws.onopen = () => {
        setWs(ws)
        ws.send(JSON.stringify({ type: "auth", payload: currentUser?._id }));
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type == "actives") {
          dispatch(setActives(data.payload))
        }
        if (data.type == "updateChat") {
          dispatch(setCurrentChat(data.payload))
        }
        if (data.type == "newMessage") {
          const { chat,message } = data.payload
          dispatch(setNewMessage(message))
          dispatch(setCurrentChat(chat))
        }
      }

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
          setWs(null)
        }
      };
    }
  }, [currentUser, userSelected])


  //Scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentChat]);

//----------------------------------


  const handleSelectUser = (selected: string) => {
    setUserSelected(selected)
  }

  const handleSendMessage = () => {
    setText("")
    const message = {
      sender: currentUser?._id as string,
      receiver: userSelected as string,
      content: text,
      _id: Date.now().toString()
    }

    dispatch(setCurrentChat({
      ...currentChat,
      messages: [...(currentChat?.messages || []), message],
    } as IChat))

    ws?.send(JSON.stringify({ type: "send", payload: message }))

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
              <div className={styles.chat} ref={chatRef}>
                {
                  currentChat ? <div className={styles.chatContent}>
                    {
                      currentChat.messages.map(message => {
                        const isFromCurrent = message.sender === currentUser?._id ? styles.rightMessage : styles.leftMessage

                        return <div key={message._id} className={`${isFromCurrent}`}>
                          <p>{message.content}</p>
                        </div>
                      })
                    }
                  </div>
                    :
                    <div className={styles.welcome}>
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
                  <button className={styles.sendBtn} onClick={handleSendMessage}>Send</button>
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
