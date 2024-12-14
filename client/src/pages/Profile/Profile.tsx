import { useEffect } from 'react'
import { getUserByUsername, verifyAuth } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setActives, setCurrentUser, updateAuth } from '../../store/actions/userActions'
import { IUserData } from '../../lib/types'
import { Chat } from '../../components/Chat/Chat'

export const Profile = () => {
  // const isAuth = useAppSelector(state => state.user.isAuth)
  const currentUser = useAppSelector(state => state.user.currentUser)
  const activeUsers = useAppSelector(state => state.user.activeUsers)

  const dispatch = useAppDispatch()
  const { username } = useParams()

  useEffect(() => {
    verifyAuth().then(res => {
      if (res.status == "ok") {
        dispatch(updateAuth(true))
        if (username) {
          getCurrentUser(username)
        }



        const ws = new WebSocket("http://localhost:5000")
        ws.onopen = () => {
          console.log("WebSocket connection established")
          ws.send(JSON.stringify({ type: "auth", payload: username }))
        }
        ws.onmessage = (message) => {
          const data = JSON.parse(message.data)

          if (data.type == "actives") {
            dispatch(setActives(data.payload))
          }
        }

        return () => {
          ws.close();
          console.log("WebSocket closed");
        };

      } else {
        dispatch(updateAuth(false))
      }
    })
  }, [])

  const getCurrentUser = (username: string) => {
    getUserByUsername(username)
      .then(res => {
        dispatch(setCurrentUser(res.data as IUserData))
      })
  }




  return (
    <Chat/>
  )
}
