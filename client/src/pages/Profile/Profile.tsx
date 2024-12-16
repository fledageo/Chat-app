import { useEffect } from 'react'
import { getUserByUsername, verifyAuth } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { useAppDispatch} from '../../store/store'
import { setCurrentUser, updateAuth } from '../../store/actions/userActions'
import { IUserData } from '../../lib/types'
import { Chat } from '../../components/Chat/Chat'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const { username } = useParams()

  useEffect(() => {
    verifyAuth().then(res => {
      if (res.status == "ok") {
        dispatch(updateAuth(true))
        if (username) {
          getCurrentUser(username)
        }
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
